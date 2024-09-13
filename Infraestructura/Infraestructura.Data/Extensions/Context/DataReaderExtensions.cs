using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura.Data.Extensions.Context
{
    public static class DataReaderExtensions
    {

        public static DbParameterCollection ToArray<TEntity>(this DbParameterCollection parameterList, TEntity entity) where TEntity : class
        {
            Type obj = entity.GetType();
            string name = obj.Name;
            PropertyInfo[] props = obj.GetProperties();

            if (props.Length > 0)
            {
                string str = "";
                foreach (var prop in props)
                {
                    if (prop.GetIndexParameters().Length == 0)
                    {
                        object paramValue = prop.GetValue(entity, null);
                        if (paramValue == null)
                            parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), DBNull.Value));
                        else
                        {
                            switch (Type.GetTypeCode(paramValue.GetType()))
                            {
                                case TypeCode.Boolean:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (bool)paramValue));
                                    break;
                                case TypeCode.DateTime:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (DateTime)paramValue));
                                    break;
                                case TypeCode.Int32:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (int)paramValue));
                                    break;
                                case TypeCode.Int64:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (long)paramValue));
                                    break;
                                case TypeCode.Double:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (double)paramValue));
                                    break;
                                case TypeCode.Decimal:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (decimal)paramValue));
                                    break;
                                case TypeCode.Object:
                                    var className = paramValue.GetType().Name;
                                    if (className == "DataTable")
                                    {
                                        parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), (DataTable)paramValue));
                                    }
                                    break;
                                default:
                                    parameterList.Add(new SqlParameter(string.Format("@{0}", prop.Name), paramValue.ToString()));
                                    break;
                            }
                        }
                    }
                }
            }
            return parameterList;
        }


        public static List<T> MapToListDomain<T>(this DbDataReader dr) where T : new()
        {
            List<T> RetVal = null;
            var Entity = typeof(T);
            var PropDict = new Dictionary<string, PropertyInfo>();
            try
            {
                RetVal = new List<T>();
                if (dr != null && dr.HasRows)
                {
                    var Props = Entity.GetProperties(BindingFlags.Instance | BindingFlags.Public);
                    PropDict = Props.ToDictionary(p => p.Name.ToUpper(), p => p);
                    while (true)
                    {
                        if (!dr.Read())
                        {
                            break;
                        }

                        T newObject = new T();
                        for (int Index = 0; Index < dr.FieldCount; Index++)
                        {
                            if (PropDict.ContainsKey(dr.GetName(Index).ToUpper()))
                            {
                                var Info = PropDict[dr.GetName(Index).ToUpper()];
                                if ((Info != null) && Info.CanWrite)
                                {
                                    var Val = dr.GetValue(Index);
                                    Info.SetValue(newObject, (Val == DBNull.Value) ? null : Val, null);
                                }
                            }
                        }
                        RetVal.Add(newObject);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return RetVal;
        }

        public static T MapToDomain<T>(this DbDataReader dr) where T : new()
        {
            T RetVal = new T();
            var Entity = typeof(T);
            var PropDict = new Dictionary<string, PropertyInfo>();
            try
            {
                if (dr != null && dr.HasRows)
                {
                    var Props = Entity.GetProperties(BindingFlags.Instance | BindingFlags.Public);
                    PropDict = Props.ToDictionary(p => p.Name.ToUpper(), p => p);
                    dr.Read();
                    for (int Index = 0; Index < dr.FieldCount; Index++)
                    {
                        if (PropDict.ContainsKey(dr.GetName(Index).ToUpper()))
                        {
                            var Info = PropDict[dr.GetName(Index).ToUpper()];
                            if ((Info != null) && Info.CanWrite)
                            {
                                var Val = dr.GetValue(Index);
                                Info.SetValue(RetVal, (Val == DBNull.Value) ? null : Val, null);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return RetVal;
        }

       

        public static DataTable buildDataTable<T>(List<T> records)
        {
            DataTable dt = new DataTable();
            Type type = typeof(T);

            for (int i = 0; i < records.Count; i++)
            {
                dt.Rows.Add(dt.NewRow());
            }

            foreach (var prop in type.GetProperties())
            {
                DataColumn cl = new DataColumn(prop.Name);
                var dataType = prop.PropertyType;
                if (dataType.IsGenericType && dataType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    dataType = dataType.GetGenericArguments()[0];
                }
                cl.DataType = dataType;


                dt.Columns.Add(cl);

                int rowIndex = 0;

                foreach (var item in records)
                {
                    DataRow dr = dt.Rows[rowIndex++];
                    dr[prop.Name] = prop.GetValue(item) is null ? DBNull.Value : prop.GetValue(item);
                }
            }

            return dt;
        }

    }
}
