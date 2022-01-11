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
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import DemandeComptePage from "./DemandeComptePage";
import Toast from "./Toast";
import * as Const from "./Constant";
import { useTranslation } from "react-i18next";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


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
    <Typography variant="body2" color="textSecondary" align="center" style={{fontSize: window.innerWidth < 1200 ? "2.5em":"1em"}}>
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
              width: "1.5em",
              height: "1em",
              position: "relative",
              top: "3px",
            }}
            src={"./images/" + t("first_lng") + ".png"}
            alt="Flag_of_France"
          ></img>
        </Link>{" "}
        ·
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

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  
  const [login, setLogin] = useState(true);
  const [showSigninPassword, handleClickShowSigninPassword] = useState(false);
  const [showSignupPassword, handleClickShowSignupPassword] = useState(false);

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
      style={window.innerWidth < 1200 ? { width: "100%", padding:"0" } : { width: "30%" }}
    >
      <CssBaseline />

      <Card style={{ width: "100%", marginTop: "3em" }}>
        <CardContent>
          <div className={classes.paper}>
            <Avatar style={{width: window.innerWidth < 1200 ? "5em":"2em", height:window.innerWidth < 1200 ? "5em":"2em"}}>
              <VpnKeyOutlinedIcon style={{width:window.innerWidth < 1200 ? "2.5em":"1em", height:window.innerWidth < 1200 ? "2.5em":"1em"}}/>
            </Avatar>
            <Typography
              style={{ color: "#3F51B5", marginTop: "0.5em" }}
              component={window.innerWidth < 1200 ? "h3":"h5"}
              variant={window.innerWidth < 1200 ? "h3":"h5"}
            >
              {t("title")}
            </Typography>

            {login && <form
              style={{ marginTop: "5em" }}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                 margin="normal"
                fullWidth
                id="email"
                placeholder=""
                label={t("username")}
                name="email"
                autoFocus
                onChange={(event) =>
                  localStorage.setItem("username", event.target.value)
                }
                defaultValue = {
                  localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : ""
                }
              />
              
              <FormControl fullWidth id="signin_password_container">
                <InputLabel htmlFor="signin_password" id="signin_password-label">{t("password")}</InputLabel>
                <Input
                  id="signin_password"
                  type={showSigninPassword ? 'text' : 'password'}
                  value={signinPassword}
                  onChange={(event) => {
                    setSigninPassword(event.target.value);
                    localStorage.setItem("password", event.target.value);
                    }
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowSigninPassword(!showSigninPassword)}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showSigninPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onKeyPress={(event)=>handleEnterTolog(event)}
                />
              </FormControl>
              <Router>
                <div style={{ marginTop: "1em", fontSize: window.innerWidth < 1200 ? "2.5em":"1em" }}>
                  <center><NavLink to={"/"} onClick={()=>setLogin(false)}>{t('no_account')}</NavLink></center>
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
                style={{height:window.innerWidth < 1200 ? "100px":"50px", fontSize: window.innerWidth < 1200 ? "2em":"1em"}}
                size="large"
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
            </form>}
            {!login && <form
              style={{ marginTop: "5em" }}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="normal"
                fullWidth
                id="signup_firstname"
                placeholder=""
                label={t("firstname")}
                name="firstname"
                autoFocus 
                onChange={(event) =>
                  localStorage.setItem("username", event.target.value)
                }
                autoComplete="off"
              />
              <FormControl fullWidth id="signup_email_container">
                <InputLabel htmlFor="signup_email" id="signup_email-label">Email</InputLabel>
                <Input
                  id="signup_email"
                  type={'email'}  
                  value={signupEmail}
                  onChange={(event) =>
                    setSignupEmail(event.target.value)
                  }
                />
              </FormControl>
              <FormControl fullWidth id="signup_password_container">
                <InputLabel htmlFor="signup_password" id="signup_password-label">{t("password")}</InputLabel>
                <Input
                  id="signup_password"
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(event) =>
                    setSignupPassword(event.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowSignupPassword(!showSignupPassword)}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showSigninPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Router>
                <div style={{ marginTop: "1em", fontSize: window.innerWidth < 1200 ? "2.5em":"1em" }}>
                  <center><NavLink to={"/"} onClick={()=>setLogin(true)}>{t('has_account')}</NavLink></center>
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
                style={{height:window.innerWidth < 1200 ? "100px":"50px", fontSize: window.innerWidth < 1200 ? "2em":"1em"}}
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<KeyboardArrowRightIcon />}
                className={classes.submit}
                onClick={() => {
                  wantToCheckPassword();
                }}
              >
                {t("signup_button")}
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
            </form>}

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
