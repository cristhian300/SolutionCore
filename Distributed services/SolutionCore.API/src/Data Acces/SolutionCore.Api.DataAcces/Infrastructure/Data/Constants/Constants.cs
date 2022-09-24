namespace Belcorp.CM.Infrastructure.CrossCutting.Constants
{
    using System;
    using System.Collections.Generic;

    public class Constants
    {
        public class ResourcesType
        {
            public const string CORE = "Core";
            public const string API = "API";
        }

        public static IList<string> ResourcesNames = new List<string>
        {
            "webDesktop",
            "appSilo",
            "appTaskManager",
            "apiGateway",
            "apiSecurity",
            "apiImage",
            "apiTask",
            "apiMaintenance",
            "apiPlanning",
            "apiIntegration",
            "apiSystemConfiguration",
            "apiInput",
            "apiLogging"
        };

        public static IList<string> ResourcesTypes = new List<string>
        {
            "API",
            "Gateway",
            "Silo",
            "Worker"
        };

        public static IDictionary<string, string> ResourcesNamesTypes = new Dictionary<string, string>
        {
            { "webDesktop", "API" },
            { "appSilo", "Silo" },
            { "appTaskManager", "Worker" },
            { "apiGateway", "Gateway" },
            { "apiSecurity", "API" },
            { "apiImage", "API" },
            { "apiTask", "API" },
            { "apiMaintenance", "API" },
            { "apiPlanning", "API" },
            { "apiIntegration", "API" },
            { "apiSystemConfiguration", "API" },
            { "apiInput", "API" },
            { "apiLogging", "API" }
        };

        public class ErrorType
        {
            public const string Domain = "DOMAIN";
            public const string APP = "APP";
        }

        public class CultureGlobalization
        {
            public const string CULTURE_INFO = "es-PE";
        }

        public class OrleansRequestKey
        {
            public const string UserKey = "UserPrincipal";
            public const string ClaimsKey = "ClaimsPrincipal";
            public const string SecurityKey = "SecurityToken";
        }

        public class Numbers
        {
            public const int ZERO = 0;
            public const int ONE = 1;
            public const int TWO = 2;
            public const int THREE = 3;
            public const int FOUR = 4;
            public const int FIVE = 5;
            public const int SIX = 6;
        }


        public class FlowTypes
        {
            public const string Planning = "P";
            public const string Reaction = "R";
            public const string ODD = "O";
        }

        public class FlowTypesForBDI
        {
            public const int Planning = 0;
            public const int Reaction = 1;
            public const int ODD = 2;
        }


        public class QueueTaskStatus
        {
            public const int New = 1;
            public const int InProcess = 2;
            public const int Cancelled = 3;
            public const int Aborted = 4;
            public const int Failed = 5;
            public const int Done = 6;
        }

        public class ClusterStatus
        {
            public const string Waiting = "WAITING";
        }

        public class StepStatus
        {
            public const string Completed = "COMPLETED";
            public const string Failed = "FAILED";
            public const string Running = "RUNNING";
            public const string Pending = "PENDING";
        }

        public enum Entity
        {
            Brand = 8,
            Category = 12,
            Format = 17,
            Handle = 18,
            Line = 21,
            Product = 23,
            PurchaseGroup = 25,
            RollingSegment = 27,
            DEO = 67,
            Route = 28,
            Subscription = 32,
            Type = 33,
            PriceLevel = 49,
            Region = 26,
            Zone = 35,
            Strategy = 36
        }

        public class Format
        {
            public const string Bundle = "B";
            public const string Volumen = "V";
            public const string Individual = "I";
        }

        public class Boleans
        {
            public const bool TRUE = true;
            public const bool FALSE = false;
        }

        public class EntityDescription
        {
            public const string Format = "Format";
            public const string Handle = "Palanca";
            public const string Brand = "Marca";
            public const string Category = "Categoría";
            public const string Type = "Type";
            public const string Line = "Line";
            public const string Product = "Product";
            public const string Subscription = "Suscripción";
            public const string Strategy = "Estrategia";
            public const string RollingSegment = "RollingSegment";
            public const string PurchaseGroup = "PurchaseGroup";
        }

        public enum BrandEntity
        {
            Lbel = 1,
            Esika = 2,
            Cyzone = 3
        }

        public enum CategoryEntity
        {
            FR = 2,
            MQ = 3,
            CP = 5,
            TC = 6,
            TF = 7,
            VARIOS = 42
        }

        public class CategoryShortDescription
        {
            public const string FR = "FR";
            public const string MQ = "MQ";
            public const string CP = "CP";
            public const string TC = "TC";
            public const string TF = "TF";
        }

        public enum ScenarioStatus
        {
            Starting = 1,
            ValuingScenario = 4,
            Results = 5,
            SentToSomosBelcorp = 6,
            SentToLegacySystems = 7,
            Ended = 8
        }

        public enum ReaccionStatus
        {

            ResultsReaction = 1, 
        }

        public enum ReactionCandidateStatus
        { 
            Starting = 1,
            ValuingReactionCandidate = 4,
            Results = 5,
            SentToSomosBelcorp = 6,
            SentToLegacySystems = 7,
            Ended = 8
        }

        public enum ODDCandidateStatus
        {
            Starting = 1,
            ValuingODDCandidate = 4,
            Results = 5,
            SentToSomosBelcorp = 6,
            SentToLegacySystems = 7,
            Ended = 8
        }

        public enum CampaignStatus
        {
            Creada = 6,
            EnConfiguracion = 7,
            ConfiguracionDTLK = 8,
            ConfiguracionAlgoritmos = 9,
            Abierta = 1
        }

        public enum Task
        {
            VerifyingInputCOP = 1,

            StartingCOP = 2,
            VerifyingCOP = 3,

            ProcessCommercialFormat = 4,


            OffersFilter = 5,
            CalculateDuplicates = 6,

            StartingROD1GenerationFiles = 7,
            VerifyingROD1GenerationFiles = 11,

            StartingROD1 = 12,
            VerifyingROD1 = 13,

            StartingROD2BagFilesGeneration = 146,
            VerifyingROD2BagFilesGeneration = 147,

            StartingROD2GenerationFiles = 14,
            VerifyingROD2GenerationFiles = 15,

            StartingROD2 = 16,
            VerifyingROD2 = 17,

            StartingDigitalForecastGenerationFiles = 18,
            VerifyingDigitalForecastGenerationFiles = 19,

            StartingDigitalForecast = 20,
            VerifyingDigitalForecast = 21,

            StartingDigitalForecastPUP = 22,
            VerifyingDigitalForecastPUP = 23,

            CalculateKPI = 24,

            //KPIPLANIT
            StartingGetPlanitTactic = 145,

            StartingEPlanningDataGeneration = 25,
            VerifyingEPlanningDataGeneration = 46,

            StartingEPlanning = 26,
            VerifyingEPlanning = 27,

            StartingUpdateCUV = 28,
            VerifyingUpdateCUV = 47,

            StartingSomosBelcorpDataGeneration = 29,
            VerifyingSomosBelcorpDataGeneration = 48,

            StartingSomosBelcorp = 30,
            VerifyingSomosBelcorp = 31,

            GenerateParameters = 32,
            SimulateScenario = 33,

            CalculateSummary = 34,

            StartingDataLoad = 35,
            VerifyingDataLoad = 36,

            ProcessDataLoad = 37,

            StartingTimeActivityZoneLoad = 152,
            StartingTimeActivityZoneUpdate = 153,

            StartingConsultantListLoad = 154,

            //  InclusionGeneration = 38, 
            DataLakeGeneration = 39,

            StartingKPIPreparation = 40,
            VerifyingKPIPreparation = 41,

            StartingTradeBalanceBelcorp = 42,
            VerifyingTradeBalanceBelcorp = 43,

            StartingDeletingDuplicates = 44,
            VerifyingDeletingDuplicates = 45,

            StartingCOPDifferential = 49,
            VerifyingCOPDifferential = 50,

            InputProductStock = 51,
            ScenariosProcesadosCOP = 52,

            CalculateDuplicatesReaction = 53,
            OffersFilterReaction = 54,

            StartingROD1GenerationFilesReaction = 55,
            VerifyingROD1GenerationFilesReaction = 56,

            StartingROD1Reaction = 57,
            VerifyingROD1Reaction = 58,

            StartingROD2GenerationFilesReaction = 59,
            VerifyingROD2GenerationFilesReaction = 60,

            StartingROD2BagFilesGenerationReaction = 148,
            VerifyingROD2BagFilesGenerationReaction = 149,

            StartingDeletingDuplicatesReaction = 61,
            VerifyingDeletingDuplicatesReaction = 62,

            StartingROD2Reaction = 63,
            VerifyingROD2Reaction = 64,

            StartingDigitalForecastGenerationFilesReaction = 65,
            VerifyingDigitalForecastGenerationFilesReaction = 66,

            StartingDigitalForecastReaction = 67,
            VerifyingDigitalForecastReaction = 68,

            StartingDigitalForecastPUPReaction = 69,
            VerifyingDigitalForecastPUPReaction = 70,

            StartingKPIPreparationReaction = 71,
            VerifyingKPIPreparationReaction = 72,

            CalculateKPIReaction = 73,

            StartingPostLegacy = 74,
            VerifyingPostLegacy = 75,

            CalculateSummaryReaction = 76,
            ReactionProcesadosDigitalForecast = 77,

            StartingEPlanningDataGenerationReaction = 78,
            VerifyingEPlanningDataGenerationReaction = 79,

            StartingEPlanningReaction = 80,
            VerifyingEPlanningReaction = 81,

            StartingUpdateCUVReaction = 82,
            VerifyingUpdateCUVReaction = 83,

            StartingSomosBelcorpDataGenerationReaction = 84,
            VerifyingSomosBelcorpDataGenerationReaction = 85,

            StartingSomosBelcorpReaction = 86,  
            VerifyingSomosBelcorpReaction = 87,  

            StartingPostLegacyReaction = 88, 
            VerifyingPostLegacyReaction = 89,

            StartingCOPDifferentialReaction = 90,
            VerifyingCOPDifferentialReaction = 91,

            ClosePlanning = 92,
            CloseReaction = 93,

            StartingDataLake = 94,
            VerifyingDataLake = 95,

            DataLakeGenerationReaction = 96,

            StartingDataLakeReaction = 97,
            VerifyingDataLakeReaction = 98,

            StartingCOPODD = 99,
            VerifyingCOPODD = 100,

            ProcessCommercialFormatODD = 101,

            CalculateDuplicatesODD = 102,
            OffersFilterODD = 103,

            StartingROD1GenerationFilesODD = 104,
            VerifyingROD1GenerationFilesODD = 105,

            StartingROD1ODD = 106,
            VerifyingROD1ODD = 107,

            StartingROD2GenerationFilesODD = 108,
            VerifyingROD2GenerationFilesODD = 109,

            StartingROD2BagFilesGenerationODD = 150,
            VerifyingROD2BagFilesGenerationODD = 151,

            StartingROD2ODD = 110,
            VerifyingROD2ODD = 111,

            StartingDigitalForecastGenerationFilesODD = 112,
            VerifyingDigitalForecastGenerationFilesODD = 113,

            StartingDigitalForecastODD = 114,
            VerifyingDigitalForecastODD = 115,

            StartingDigitalForecastPUPODD = 116,
            VerifyingDigitalForecastPUPODD = 117,

            StartingKPIPreparationODD = 118,
            VerifyingKPIPreparationODD = 119,

            CalculateKPIODD = 120,

            StartingEPlanningDataGenerationODD = 121,
            VerifyingEPlanningDataGenerationODD = 122,

            StartingEPlanningODD = 123,
            VerifyingEPlanningODD = 124,

            StartingUpdateCUVODD = 125,
            VerifyingUpdateCUVODD = 126,

            StartingSomosBelcorpDataGenerationODD = 127,
            VerifyingSomosBelcorpDataGenerationODD = 128,

            StartingSomosBelcorpODD = 129,
            VerifyingSomosBelcorpODD = 130,

            SnapshotKPIODD = 131,

            ProcesadosDigitalForecastODD = 132,

            StartingPostLegacyODD = 133,
            VerifyingPostLegacyODD = 134,

            DataLakeGenerationODD = 135,
            StartingDataLakeODD = 136,
            VerifyingDataLakeODD = 137,

            StartingDataLakePlanningShipment = 138,
            VerifyingDataLakePlanningShipment = 139,

            StartingDataLakeReactionShipment = 140,
            VerifyingDataLakeReactionShipment = 141,

            StartingDataLakeODDShipment = 142,
            VerifyingDataLakeODDShipment = 143,

            StartingScenarioPlanitSend = 144,
            VerifyingScenarioPlanitSend = 145
        }

        public class ScenarioProcessAlgorithmCode
        {
            public const string ROD1 = "ROD1";
            public const string ROD2 = "ROD2";
        }

        public enum InputOrigin
        {
            COP = 1,
            MDG = 2
        }

        public class BooleanValuesExcel
        {
            public const string Si = "1";
            public const string No = "0";
        }

        public enum Subscription
        {
            All = 1,
            Unsubscribed = 2,
            Subscribed = 3
        }

        public class CampaignProfitPhysicalType
        {
            public const string NoProjection = "000";
            public const string Projection = "F";
        }

        public class SubscriptionCode
        {
            public const string Todas = "0";
            public const string Suscribed = "2";
            public const string Unsuscribed = "1";
        }

        public class SubscriptionCodeDF
        {
            public const string Suscribed = "1";
            public const string Unsuscribed = "0";
        }

        public class SubscriptionDescription
        {
            public const string Todas = "0";
            public const string Suscribed = "SUSCRITA";
            public const string Unsuscribed = "NO SUSCRITA";
        }

        public class ForzedLocation
        {
            public const string Started = "INICIO";
            public const string Finished = "FIN";
        }

        public class ForzedLocationCode
        {
            public const int Started = 1;
            public const int Finished = 2;
        }

        public class FlagTactic
        {
            public const char Segmentada = 'S';
            public const char Masiva = 'R';
            public const char Personalizada = 'P';
        }

        public static class FlagTacticName
        {
            public static Tuple<string, string, string> Segmentada = Tuple.Create(FlagTactic.Segmentada.ToString(), "Segmentada", "#bfbfbf");
            public static Tuple<string, string, string> Masiva = Tuple.Create(FlagTactic.Masiva.ToString(), "Masiva", "#42a5f5");
            public static Tuple<string, string, string> Personalizada = Tuple.Create(FlagTactic.Personalizada.ToString(), "Personalizada", "#0d47a1");
            public static Tuple<string, string, string> MasivaGM = Tuple.Create("R2", "MDG", "#90caf9");

            public static string GetName(char flagTactic, bool flagGainMaterial)
            {
                switch (flagTactic)
                {
                    case FlagTactic.Segmentada:
                        return Segmentada.Item1;
                    case FlagTactic.Personalizada:
                        return Personalizada.Item1;
                    case FlagTactic.Masiva:
                        return flagGainMaterial ? MasivaGM.Item1 : Masiva.Item1;
                    default:
                        return string.Empty;
                }
            }

            public static List<Tuple<string, string, string>> GetAll()
            {
                return new List<Tuple<string, string, string>> {
                    Segmentada,
                    Masiva,
                    Personalizada,
                    MasivaGM
                };
            }
        }

        public static class FormatName
        {
            public const string Individual = "Individual";
            public const string Bundle = "Bundle";
            public const string Volumen = "Volumen";

            public static string GetName(string formatCode)
            {
                switch (formatCode)
                {
                    case Format.Individual:
                        return Individual;
                    case Format.Bundle:
                        return Bundle;
                    case Format.Volumen:
                        return Volumen;
                    default:
                        return string.Empty;
                }
            }

            public static List<string> GetAll()
            {
                return new List<string> { Individual, Bundle, Volumen };
            }
        }

        public static class OfferPriceRange
        {
            public const string FromZeroTo490 = "[0;490>";
            public const string From490To13790 = "[490;13790>";
            public const string From13790To18290 = "[13790;18290>";
            public const string From18290 = "[18290 a más";

            public static Tuple<decimal, decimal, string> Range1 = Tuple.Create(decimal.Zero, (decimal)490, FromZeroTo490);
            public static Tuple<decimal, decimal, string> Range2 = Tuple.Create((decimal)490, (decimal)13790, From490To13790);
            public static Tuple<decimal, decimal, string> Range3 = Tuple.Create((decimal)13790, (decimal)18290, From13790To18290);
            public static Tuple<decimal, decimal, string> Range4 = Tuple.Create((decimal)18290, decimal.MaxValue, From18290);

            public static string GetLabel(decimal value)
            {
                if (value >= Range1.Item1 && value < Range1.Item2)
                    return Range1.Item3;

                else if (value >= Range2.Item1 && value < Range2.Item2)
                    return Range2.Item3;

                else if (value >= Range3.Item1 && value < Range3.Item2)
                    return Range3.Item3;

                else if (value >= Range4.Item1 && value < Range4.Item2)
                    return Range4.Item3;

                else
                    return string.Empty;
            }

            public static List<string> GetAll()
            {
                return new List<string> { FromZeroTo490, From490To13790, From13790To18290, From18290 };
            }
        }

        public class HandleCode
        {
            public const string ShowRoom = "SR";
            public const string LoNuevoNuevo = "LAN";
            public const string LaMasGanadora = "LMG";
            public const string OfertasDelDia = "ODD";
            public const string OfertaFinal = "OF";
            public const string GuiaDeNegocio = "GND";
        }

        public enum ProcessStatus
        {
            Started = 1,
            Finished = 2,
            Failed = 3
        }

        public class ProcessTypeCodes
        {
            public const string COPModelTraining = "COPModelTraining";
            public const string COPODDModelTraining = "COPODDModelTraining";
            public const string RODModelTraining = "RODModelTraining";
            public const string DFModelTraining = "DFModelTraining";
            public const string MasterFiles = "MasterFiles";
            public const string TypeMaster = "TypeMaster";

            public const string COPProcessing = "COPProcessing";
            public const string DataLoad = "DataLoad";
            public const string EPlanningDataGeneration = "EPlanningDataGeneration";
            public const string SomosBelcorpDataGeneration = "SomosBelcorpDataGeneration";

            public const string TimeActivityZoneLoad = "TimeActivityZoneLoad";
            public const string TimeActivityZoneUpdate = "TimeActivityZoneUpdate";

            public const string ROD1Files = "ROD1Files";
            public const string ROD1 = "ROD1";

            public const string ROD2BagFiles = "ROD2BagFiles";
            public const string ROD2Files = "ROD2Files";
            public const string ROD2 = "ROD2";

            public const string DeletingDuplicates = "DeletingDuplicates";

            public const string DigitalForecastFiles = "DigitalForecastFiles";
            public const string DigitalForecast = "DigitalForecast";

            public const string DigitalForecastPUP = "DigitalForecastPUP";


            public const string KPIPreparation = "KPIPreparation";

            public const string EPlanning = "EPlanning";
            public const string SomosBelcorp = "SomosBelcorp";

            public const string ScenarioParameters = "ScenarioParameters";

            public const string TradeBalance = "TradeBalance";

            public const string UpdateCUVs = "UpdateCUVs";

            public const string COPDifferential = "COPDifferential";

            public const string DataLake = "DataLake";

            public const string PostLegacy = "PostLegacy";

            public const string DataLakeShipment = "DataLakeShipment";
        }


        public class Catalog
        {
            public const string Revista = "01";
            public const string Otros = "02";
        }

        public class MessagePlannerReaction
        {
            public const string NO_OFFER_PLANNER = "No existen Ofertas para la reacción.";
            public const string CARGA_INCORRECTA = "No se pudo cargar el archivo por tener errores de validación.";
            public const string CARGA_CORRECTA = "El archivo se cargo correctamente";
            public const string REGLAS_INCORRECTAS = "No existen Reglas de Stock para "; 
            
            
        }

        public class MessagePlannerODD
        {
            public const string NO_OFFER_PLANNER = "No existen Ofertas para la ODD.";
            public const string CARGA_INCORRECTA = "No se pudo cargar el archivo por tener errores de validación.";
            public const string CARGA_CORRECTA = "El archivo se cargo correctamente";
            public const string REGLAS_INCORRECTAS = "No existen Reglas de Stock para ";


        }


        public class BusinessUnitCode
        {
            public const string Cosmeticos = "010";
            public const string CosmeticosDesc = "COSMETICOS";
        }

        public class BrandShortDescription
        {
            public const string Lbel = "LBEL";
            public const string LbelPlanit = "L'BEL";
        }

        public class SaleForm
        {
            public const string Catalogo = "CATALOGO";
        }

        public enum KpiType
        {
            PMEP = 1,
            PMNP = 2,
            PUP = 3,
            Rule = 4,
            Offer = 5,
            PMEPM = 6,
            PMNPM = 7,
            PUPM = 8,
            RuleM = 9,
            PMEPSP = 10,
            PMNPSP = 11,
            PUPSP = 12,
            RuleSP = 13,
        }

        public enum KpiTypeGroup
        {
            TotalCountry = 1,
            PhysicalMagazine = 2,
            DigitalMagazine = 3
        }

        public class KpiTypeGroupDescription
        {
            public const string DigitalMagazine = "Revista Digital";
            public const string Catalogue = "Catálogo";
            public const string PhysicalMagazine = "Revista Física";
            public const string TotalCountry = "Total País";
        }

        /// <summary>
        /// Tabla: "Planning"."KpiTypeGraph"
        /// </summary>
        public enum KpiTypeGraph
        {
            DigitalMagazine = 1,
            PhysicalMagazine = 2,
            Catalogue = 3,
            TotalCountry = 4,
            Reaction = 5,
            ODD = 6,
            PhysicalReplica = 7,
            ExclusiveMassive = 8,
            PerSegPlanit = 9,
            PerSegDF = 10
        }

        public class SummaryNames
        {
            public const string Handle = "OFERTAS POR PALANCA";
            public const string Category = "OFERTAS POR CATEGORÍA";
            public const string Format = "OFERTAS POR FORMATO";
            public const string PriceLevel = "NIVEL DE PRECIOS";
        }

        public enum ScenarioSummaryType
        {
            OffersPerHandle = 1,
            OffersPerCategory = 2,
            OffersPerFormat = 3,
            OffersPerPriceLevel = 4,
            OffersTotal = 5,
            OffersPerBrand = 6
        }

        public enum CampaignOfferType
        {
            COP = 1,
            Scenario = 2,
            Reaction = 3,
            ODD = 4
        }

        public enum ReactionStatus
        {
            Created = 1,
            Configuration = 2,
            Open = 3,
            Closed = 4,
            SentToLegacySystems = 5
        }

        public enum ODDStatus
        {
            Created = 1,
            Configuration = 2,
            Open = 3,
            Closed = 4,
            SentToLegacySystems = 5
        }

        public class SimulationTypeCode
        {
            public const string Scenario = "S";
            public const string Reaction = "R";
            public const string Odd = "O";
        }

        public class SimulationTypeId
        {
            public const int Scenario = 1;
            public const int Reaction = 2;
            public const int Odd = 3;
        }

        public enum SystemVariable
        {
            Porcentaje = 1,
            FileTemplate = 34,
            FileTemplateODD = 35,
            FileTemplateTypeMaster = 36,
            FileTemplateDescriptionMaster = 37,
            FileTemplatePlannerOffer = 38,
            FileTemplatePlannerOfferWithDay = 39,
            FileTemplateConsultant = 40,

            FeatureFlagDEO = 100
        }
        public class FlowTypeId
        {
            public const string Reaccion = "ReactionCandidateId";
            public const string Odd = "ODDCandidateId";
            public const string Scenario = "ScenarioId";
        }

        public class FlowTypeDesc
        {
            public const string Reaccion = "RX";
            public const string Odd = "ODD";
            public const string Scenario = "ScenarioId";
        }
    }
}
