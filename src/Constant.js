/** DEPLOIEMENT LOCAL POUR DEBUG SERVEUR API **/
/** PERMET DE PASSER PAR LE SERVEUR API DEPLOYE EN LOCAL **/

export const URL_GET_LAST_HEARTBEAT_MSG =
  "http://qenvi.space:8081/GetDashboardReqByClientWS";

export const URL_GET_ALL_MAPS =
  "http://qenvi.space:8081/GetAllMsgMapWS";

export const URL_UPD_STATUS_MANAG_PAGE =
  "http://qenvi.space:8081/updateHeartBeatWS";

export const URL_FETCH_LAST_HEARTBEAT_MSG =
  "http://qenvi.space:8081/fetchLastHeartbeatMessageWS";

export const URL_UPD_STATUS_MAP_PAGE =
  "http://qenvi.space:8081/updateMsgMapStatusByMapIdWS";
export const URL_WS_LOGIN = "http://193.70.86.40:8081/authWS";
export const URL_WS_PROVIDE_METRICS =
  "http://193.70.86.40:8081/getAllMetricsWS";
export const URL_WS_PROVIDE_DETAILS =
  "http://193.70.86.40:8081/getAllMetricsByCobotWS";
export const URL_WS_ALL_MAPS = "http://193.70.86.40:8081/GetAllMsgMapByRobotWS";
export const URL_WS_INS_DEF = "http://193.70.86.40:8081/InsertMsgDefItineWS";
export const URL_WS_FETCH_HEARTBEAT =
  "http://193.70.86.40:8081/GetAllMetricsByClientAndRobotAndPKWS";
export const URL_WS_SET_USER_COMMENT =
  "http://193.70.86.40:8081/SetUserCommentByPkWS";
export const URL_WS_SET_MAP_NAME = "http://193.70.86.40:8081/SetMapNameByPkWS";
export const URL_WS_INS_ACT = "http://193.70.86.40:8081/InsertActionsWS";
export const URL_WS_ALL_ROBOTS =
  "http://193.70.86.40:8081/GetAllRobotByClientWS";
export const URL_WS_ALL_DEF = "http://193.70.86.40:8081/GetAllDefItineWS";
export const URL_WS_DEL_DEF = "http://193.70.86.40:8081/DeleteMsgDefItineWS";
export const URL_WS_DEL_ALL_DEF =
  "http://193.70.86.40:8081/DeleteAllMsgDefItineWS";

export const URL_WS_DEL_ONE_MAP = "http://193.70.86.40:8081/DeleteMapWS";
export const URL_WS_DEL_ALL_MAPS = "http://193.70.86.40:8081/DeleteAllMapsWS";

export const URL_WS_ROBOT_INFO = "http://193.70.86.40:8081/GetRobotByMapWS";
export const URL_WS_ROBOT_HEARTS = "http://193.70.86.40:8081/GetAllHeartBeatWs";

export const URL_WS_ADD_ACTION = "http://193.70.86.40:8081/AddCommandeWS";

export const URL_WS_SYNTHESE = "http://localhost:8080/syntheseSelectionWS";
export const URL_WS_DETAIL = "http://localhost:8080/detailSelectionWS";
export const URL_WS_ECART_FAVORI =
  "http://localhost:8080/rapportCourseFavorisWS";
export const URL_WS_PROVIDE_DOSSIER =
  "http://localhost:8080/dossierSelectionUtilisateurWS";
export const URL_WS_DELETE_DOSSIER =
  "http://localhost:8080/dossierSelectionUtilisateurWS";
export const URL_WS_SAVE_DOSSIER =
  "http://localhost:8080/dossierSelectionUtilisateurWS";
export const URL_WS_RECHERCHE = "http://localhost:8080/rechercheSelectionWS";
export const URL_ADMINISTRATION = "http://localhost:8080/administrationWS";
export const URL_PROVIDE_COURSES =
  "http://localhost:8080/provideCoursesSyntheseWS";
export const URL_ECART_SELECTION =
  "http://localhost:8080/provideEcartSyntheseWS";
export const URL_PROVIDE_PROGRAMME_PARTANTS =
  "http://localhost:8080/provideProgrammePartantsWS";
export const URL_PROVIDE_STATISTIQUES_PARTANTS =
  "http://localhost:8080/provideStatistiquesPartantsWS";
export const URL_BACKTEST = "http://localhost:8080/backtestWS";
export const URL_ANALYSE = "http://localhost:8080/analyseWS";
export const URL_BIBLIOTHEQUE = "http://localhost:8080/provideBibliothequeWS";
export const URL_BIBLIOTHEQUE_RECHERCHE =
  "http://localhost:8080/provideBibliothequeRechercheWS";
export const URL_PARTANTS = "http://localhost:8080/providePartantsWS";
export const URL_STATS_TROTTEUR =
  "http://localhost:8080/provideStatsTrotteurWS";
export const URL_STATS_DRIVER = "http://localhost:8080/provideStatsDriverWS";
export const URL_STATS_ENTRAINEUR =
  "http://localhost:8080/provideStatsEntraineurWS";
export const URL_SYNTHESE = "http://localhost:8080/provideSyntheseWS";
export const URL_PROVIDE_FAVORI = "http://localhost:8080/provideFavoriWS";
export const URL_DELETE_FAVORI = "http://localhost:8080/deleteFavoriWS";
export const URL_PUT_FAVORI = "http://localhost:8080/putFavoriWS";
export const URL_SELECTION_DETAILS_WS =
  "http://localhost:8080/provideSelectionDetailsWS";
export const URL_PROVIDE_COURSE_WS =
  "http://localhost:8080/provideProgrammeCoursesWS";
export const URL_PROVIDE_CHRONO_WS = "http://localhost:8080/topChronoWS";

/** DEPLOIMENT LOCAL SUR LE SERVEUR API REMOTE **/
/** PERMET DE PASSER DIRECTEMENT PAR LE SERVEUR API DE PROD (BYPASS LE HACK PHP) **/

/*
export const URL_WS_LOGIN = "http://51.38.231.178:8080/authWS";
export const URL_WS_SYNTHESE = "http://51.38.231.178:8080/syntheseSelectionWS";
export const URL_WS_DETAIL = "http://51.38.231.178:8080/detailSelectionWS";
export const URL_WS_ECART_FAVORI = "http://51.38.231.178:8080/rapportCourseFavorisWS";
export const URL_WS_PROVIDE_DOSSIER = "http://51.38.231.178:8080/dossierSelectionUtilisateurWS";
export const URL_WS_DELETE_DOSSIER = "http://51.38.231.178:8080/dossierSelectionUtilisateurWS";
export const URL_WS_SAVE_DOSSIER = "http://51.38.231.178:8080/dossierSelectionUtilisateurWS";
export const URL_WS_RECHERCHE = "http://51.38.231.178:8080/rechercheSelectionWS";
export const URL_ADMINISTRATION = "http://51.38.231.178:8080/administrationWS";
export const URL_PROVIDE_COURSES = "http://51.38.231.178:8080/provideCoursesSyntheseWS"
export const URL_ECART_SELECTION = "http://51.38.231.178:8080/provideEcartSyntheseWS"
export const URL_PROVIDE_PROGRAMME_PARTANTS = "http://51.38.231.178:8080/provideProgrammePartantsWS"
export const URL_PROVIDE_STATISTIQUES_PARTANTS = "http://51.38.231.178:8080/provideStatistiquesPartantsWS"
export const URL_BACKTEST = "http://51.38.231.178:8080/backtestWS"
export const URL_ANALYSE = "http://51.38.231.178:8080/analyseWS"
export const URL_BIBLIOTHEQUE = "http://51.38.231.178:8080/provideBibliothequeWS"
export const URL_PARTANTS = "http://51.38.231.178:8080/providePartantsWS"
export const URL_STATS_TROTTEUR = "http://51.38.231.178:8080/provideStatsTrotteurWS"
export const URL_STATS_DRIVER = "http://51.38.231.178:8080/provideStatsDriverWS"
export const URL_STATS_ENTRAINEUR = "http://51.38.231.178:8080/provideStatsEntraineurWS"
export const URL_SYNTHESE = "http://51.38.231.178:8080/provideSyntheseWS"
export const URL_PROVIDE_FAVORI = "http://51.38.231.178:8080/provideFavoriWS"
export const URL_DELETE_FAVORI = "http://51.38.231.178:8080/deleteFavoriWS"
export const URL_PUT_FAVORI = "http://51.38.231.178:8080/putFavoriWS"
export const URL_SELECTION_DETAILS_WS= "http://51.38.231.178:8080/provideSelectionDetailsWS"
export const URL_PROVIDE_COURSE_WS= "http://51.38.231.178:8080/provideProgrammeCoursesWS"
export const URL_PROVIDE_CHRONO_WS= "http://51.38.231.178:8080/topChronoWS"
export const URL_BIBLIOTHEQUE_RECHERCHE = "http://51.38.231.178:8080/provideBibliothequeRechercheWS"




/** DEPLOIEMENT PROD DATATURF.FR **/
/** ULR POUR LE DEPLOIEMENT SUR LE FTP OVH (PROD) **/

/*
export const URL_WS_LOGIN = "https://www.dataturf.fr/apps/ws/authWS.php"; 
export const URL_WS_SYNTHESE = "https://www.dataturf.fr/apps/ws/syntheseSelectionWS";
export const URL_WS_DETAIL = "https://www.dataturf.fr/apps/ws/detailSelectionWS.php";
export const URL_WS_ECART_FAVORI = "https://www.dataturf.fr/apps/ws/rapportCourseFavorisWS.php";
export const URL_WS_PROVIDE_DOSSIER = "https://www.dataturf.fr/apps/ws/provideDossierSelectionUtilisateurWS.php";
export const URL_WS_DELETE_DOSSIER = "https://www.dataturf.fr/apps/ws/deleteDossierSelectionUtilisateurWS.php";
export const URL_WS_SAVE_DOSSIER = "https://www.dataturf.fr/apps/ws/saveDossierSelectionUtilisateurWS.php";
export const URL_WS_RECHERCHE = "https://www.dataturf.fr/apps/ws/rechercheSelectionWS.php";
export const URL_ADMINISTRATION = "https://www.dataturf.fr/apps/ws/administrationWS.php";
export const URL_PROVIDE_COURSES = "https://www.dataturf.fr/apps/ws/provideCoursesSyntheseWS.php";
export const URL_ECART_SELECTION = "https://www.dataturf.fr/apps/ws/provideEcartSyntheseWS.php";
export const URL_PROVIDE_PROGRAMME_PARTANTS = "https://www.dataturf.fr/apps/ws/provideProgrammePartantsWS"
export const URL_PROVIDE_STATISTIQUES_PARTANTS = "https://www.dataturf.fr/apps/ws/provideStatistiquesPartantsWS"
export const URL_BACKTEST = "https://www.dataturf.fr/apps/ws/backtestWS"
export const URL_ANALYSE = "https://www.dataturf.fr/apps/ws/analyseWS"
export const URL_BIBLIOTHEQUE = "https://www.dataturf.fr/apps/ws/provideBibliothequeWS"
export const URL_PARTANTS = "https://www.dataturf.fr/apps/ws/providePartantsWS"
export const URL_STATS_TROTTEUR = "https://www.dataturf.fr/apps/ws/provideStatsTrotteurWS"
export const URL_STATS_DRIVER = "https://www.dataturf.fr/apps/ws/provideStatsDriverWS"
export const URL_STATS_ENTRAINEUR = "https://www.dataturf.fr/apps/ws/provideStatsEntraineurWS"
export const URL_SYNTHESE = "https://www.dataturf.fr/apps/ws/provideSyntheseWS"
export const URL_PROVIDE_FAVORI = "https://www.dataturf.fr/apps/ws/provideFavoriWS"
export const URL_DELETE_FAVORI = "https://www.dataturf.fr/apps/ws/deleteFavoriWS"
export const URL_PUT_FAVORI = "https://www.dataturf.fr/apps/ws/putFavoriWS"
export const URL_SELECTION_DETAILS_WS= "https://www.dataturf.fr/apps/ws/provideSelectionDetailsWS"
export const URL_PROVIDE_COURSE_WS= "https://www.dataturf.fr/apps/ws/provideProgrammeCoursesWS"
export const URL_PROVIDE_CHRONO_WS= "https://www.dataturf.fr/apps/ws/topChronoWS"
export const URL_BIBLIOTHEQUE_RECHERCHE = "https://www.dataturf.fr/apps/ws/provideBibliothequeRechercheWS"
*/
