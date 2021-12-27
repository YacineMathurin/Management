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
import { useTranslation } from "react-i18next";
// import i18n from "i18next";

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

function Copyright() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const changeLanguage = (lng) => {
    console.log(lng, lng.toLowerCase(), lng.toLowerCase().toString());
    i18n.changeLanguage(lng.toLowerCase());
  };

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t("copyright")}
      <Link color="inherit" href="http://www.qenvirobotics.com/">
        {t("company")}
      </Link>{" "}
      <br></br>
      <span>
        {t("translate_text")}{" "}
        <Link
          to="/"
          className="language1"
          onClick={() => changeLanguage(t("first_lng").substring(0, 2))}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          {t("first_lng")}{" "}
          <img
            style={{
              width: "25px",
              height: "15px",
              position: "relative",
              top: "3px",
            }}
            src={"./images/" + t("first_lng") + ".png"}
            alt="Flag_of_France"
          ></img>
        </Link>{" "}
        ·
        {/* | ·{" "}
        <Link
          to="/"
          className="language2"
          onClick={() => changeLanguage(t("second_lng").substring(0, 2))}
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "#E03B8B",
          }}
        >
          {t("second_lng")}
        </Link>{" "}
        · */}
      </span>
    </Typography>
  );
}

function SignIn({ callbackFunction }) {
  // const t = props.t;
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
  function handleEnterTolog(e) {
    console.log("handleEnterTolog", e, e.which);
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.which==13) wantToCheckPassword();
  }
  return (
    <Container
      component="main"
      style={window.innerWidth < 1280 ? { width: "85%" } : { width: "30%" }}
    >
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
              {t("title")}
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
                label={t("username")}
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
                label={t("password")}
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
                onKeyPress={(event)=>handleEnterTolog(event)}
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Rester connecté"
          /> */}
              <Router>
                <div style={{ marginTop: "1em" }}>
                  <center>
                    <span>{t("question")}</span>
                  </center>

                  <center>
                    <span>
                      {" "}
                      <a
                        style={{ color: "#3F51B5" }}
                        href="mailto:support@qenvi.fr"
                      >
                        {t("contact")}
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
                {t("go_button")}
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
                          message={t("login_ko")}
                          callback={() => {
                            var dummy = 1;
                          }}
                        ></Toast>
                      ); // never called ?
                    if (data == "ERROR") {
                      return (
                        <Toast
                          severity="error"
                          message={t("login_ko")}
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
                      callbackFunction(data.serial, data.validite);
                    }
                    return null;
                  }}
                </Async>
              )}
            </form>
          </div>
          <Box mt={3}>
            <Copyright translation={t} />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
export default SignIn;
