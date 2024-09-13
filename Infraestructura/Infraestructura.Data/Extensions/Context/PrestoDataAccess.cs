using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace Infraestructura.Data.Extensions.Context
{
    public static class PrestoDataAccess
    {
        //para stores
        public static List<T> ExecuteStoreGenericList<T>(this DbContext dbContext, string procedureName, object parameters) where T : new()
        {

            var result = new List<T>();

             var connection = dbContext.Database.GetDbConnection();



            try
            {
                using (var command = connection.CreateCommand())
                {

                    bool isOpen = connection.State == ConnectionState.Open;
                    if (!isOpen) connection.Open();

                    command.CommandType = CommandType.StoredProcedure;

                    command.CommandText = procedureName;
                    command.Parameters.ToArray(parameters);
                    var reader = command.ExecuteReader();

                    result = reader.MapToListDomain<T>();

                    command.Parameters.Clear();


                }
            }
            catch (SqlException ex)
            {
                throw;
            }
            finally
            {
                connection.Close();

            }
            return result;

        }

        public static long ExecuteStoreInsertGeneric(this DbContext dbContext, string procedureName, object parameters)
        {


            long result = 0;
            var connection = dbContext.Database.GetDbConnection();



            try
            {
                using (var command = connection.CreateCommand())
                {

                    bool isOpen = connection.State == ConnectionState.Open;
                    if (!isOpen) connection.Open();

                       command.CommandType = CommandType.StoredProcedure;
                        command.CommandText = procedureName;
                        command.Parameters.ToArray(parameters);

                        var objectResult = command.ExecuteScalar();

                        if (objectResult != null)
                        {
                            result = Convert.ToInt64(objectResult);
                        }

                        command.Parameters.Clear();

                    }
                }
                catch (SqlException ex)
                {
                    throw;
                    // LogManager.HandleException(ex);
                }
                finally
                {
                connection.Close();
            }
             
            return result;

        }


        //para sentencias
        public static List<T> ExecuteSqlQuery<T>(this DbContext dbContext, string querySQL, params object[] args) where T : new()
        {
            List<T> list = new List<T>();
            var connection = dbContext.Database.GetDbConnection();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = string.Format(querySQL, args);

                bool isOpen = connection.State == ConnectionState.Open;
                if (!isOpen) connection.Open();

                //dbContext.Database.OpenConnection();

                try
                {
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                T item = new T();
                                Type type = item.GetType();
                                PropertyInfo[] properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

                                properties.ToList().ForEach(property =>
                                {
                                    try
                                    {
                                        if (reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                        {
                                            property.SetValue(item, null, null);
                                        }
                                        else
                                        {
                                            var value = reader[property.Name];
                                            property.SetValue(item, value, null);
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        throw ex;
                                    }
                                });
                                list.Add(item);
                            }
                        }
                    }
                    return list;
                }
                catch (Exception ex)
                {
                    throw;
                    //throw new Exception(ex.Message, ex);
                }
                finally
                {
                    connection.Close();
                }

            }
        }

        public static void ExecuteSqlNonQuery(this DbContext dbContext, string querySQL, params object[] args)
        {
            var connection = dbContext.Database.GetDbConnection();
            try
            {
                using (var command = connection.CreateCommand())
                {
                    bool isOpen = connection.State == ConnectionState.Open;
                    if (!isOpen) connection.Open();

                    command.CommandText = string.Format(querySQL, args);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
               // throw new Exception(ex.Message, ex);
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
