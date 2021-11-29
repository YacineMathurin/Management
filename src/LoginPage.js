import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import React, { useState, Suspense } from "react";
import Async from "react-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DemandeComptePage from "./DemandeComptePage";
import Toast from "./Toast";
import * as Const from "./Constant";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation, withTranslation, Trans } from "react-i18next";

function Copyright() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t("login_page.copyright")}
      <Link color="inherit" href="http://www.qenvirobotics.com/">
        {t("login_page.company")}
      </Link>{" "}
      <span>
        {t("login_page.translate")}
        <Link
          to="/"
          className={classes.language}
          onClick={() => changeLanguage("en")}
        >
          {" "}
          {t("login_page.first_lng")}
        </Link>{" "}
        · | ·
        <Link
          to="/"
          className={classes.language}
          onClick={() => changeLanguage("es")}
        >
          {" "}
          {t("login_page.second_lng")}
        </Link>
        ·
      </span>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  language: {
    cursor: "pointer",
    color: "#E03B8B",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const loadKeyApi = async ({ user }, { pass }) => {
  user = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "";
  pass = localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "";

  //https://docs.react-async.com/getting-started/usage
  const res = await fetch(
    Const.URL_WS_LOGIN + `?email=${user}&password=${pass}`
  );
  if (!res.ok) throw new Error("error");
  return res.json();
};

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <div>loading...</div>
  </div>
);

function Main(props) {
  const { t } = useTranslation();
  // start fresh
  localStorage.removeItem("expandedRows");
  localStorage.removeItem("page");

  const classes = useStyles();

  const [checkPassword, setCheckPassword] = useState(false);
  const [apiKey, setApiKey] = useState("000");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function wantToCheckPassword() {
    if (checkPassword) setCheckPassword(false);
    else setCheckPassword(true);
  }
  return (
    <Container component="main" style={{ width: "450px" }}>
      <CssBaseline />

      <Card style={{ width: "100%", marginTop: "3em" }}>
        <CardContent>
          <div className={classes.paper}>
            <Avatar>
              <VpnKeyOutlinedIcon />
            </Avatar>
            <Typography
              style={{ color: "#3F51B5", marginTop: "0.5em" }}
              component="h1"
              variant="h5"
            >
              {t("login_page.title")}
            </Typography>

            <form
              style={{ marginTop: "2em" }}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                placeholder=""
                label={t("login_page.username")}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) =>
                  localStorage.setItem("username", event.target.value)
                }
                defaultValue={
                  localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : ""
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder=""
                name="password"
                label={t("login_page.password")}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) =>
                  localStorage.setItem("password", event.target.value)
                }
                defaultValue={
                  localStorage.getItem("password")
                    ? localStorage.getItem("password")
                    : ""
                }
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Rester connecté"
          /> */}
              <Router>
                <div style={{ marginTop: "1em" }}>
                  <center>
                    <span>{t("login_page.question")}</span>
                  </center>

                  <center>
                    <span>
                      {" "}
                      <a
                        style={{ color: "#3F51B5" }}
                        href="mailto:support@qenvi.fr"
                      >
                        {t("login_page.contact")}
                      </a>
                    </span>
                  </center>
                </div>
                <Switch>
                  <Route path="/demande">
                    <DemandeComptePage />
                  </Route>
                </Switch>
              </Router>
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<KeyboardArrowRightIcon />}
                className={classes.submit}
                onClick={() => {
                  wantToCheckPassword();
                }}
              >
                {t("login_page.go_button")}
              </Button>
              {checkPassword && (
                <Async promiseFn={loadKeyApi}>
                  {({ data, error, isPending }) => {
                    if (isPending)
                      return (
                        <center>
                          <CircularProgress disableShrink />
                        </center>
                      );
                    if (error)
                      return (
                        <Toast
                          severity="error"
                          message="Identifiant de connexion incorrect"
                          callback={() => {
                            var dummy = 1;
                          }}
                        ></Toast>
                      ); // never called ?
                    if (data == "ERROR") {
                      return (
                        <Toast
                          severity="error"
                          message="Identifiant de connexion incorrect"
                          callback={() => {
                            var dummy = 1;
                          }}
                        ></Toast>
                      );
                    } else {
                      setApiKey(data.serial);
                      setCheckPassword(false);
                      console.log(data.serial);
                      console.log(JSON.stringify(data));
                      props.callbackFunction(data.serial, data.validite);
                    }
                    return null;
                  }}
                </Async>
              )}
            </form>
          </div>
          <Box mt={3}>
            <Copyright />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default function SignIn(props) {
  <Suspense fallback={<Loader />}>
    <Main props={props}></Main>
  </Suspense>;
}
