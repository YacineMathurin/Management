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
import formatRelativeWithOptions from "date-fns/esm/fp/formatRelativeWithOptions";


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
  const [password, setPassword] = useState("");
  
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loginError, setLoginError] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(true);
  const [reset, setReset] = useState(false);
  const [emailResetPass, setEmailResetPass] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetCode, setResetCode] = useState(null);
  const [showSigninPassword, handleClickShowSigninPassword] = useState(false);
  const [showSignupPassword, handleClickShowSignupPassword] = useState(false);
  const [showResetPassword, handleClickShowResetPassword] = useState(false);

  function wantToCheckPassword() {
    if (checkPassword) setCheckPassword(false);
    else setCheckPassword(true);
  }

  function handleEnterTolog(e) {
    console.log("handleEnterTolog", e, e.which);
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.which==13) loadKeyApi();
  }
  function handleEnterToReset(e) {
    // console.log("handleEnterTolog", e, e.which);
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.which==13) handleResetPass();
    // setEmailResetPass(e.target.value)
    // e.preventDefault();
  }
  function handleEnterToConfirmReset(e) {
    console.log("handleEnterTolog", e, e.which);
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.which==13) handleConfirmResetPass();
  }

  const loadKeyApi = () => {   
    const user = signinEmail || localStorage.getItem("email");
    const pass = signinPassword;
  
    const data = {email:user.toLowerCase(), password:pass};
    //https://docs.react-async.com/getting-started/usage
    fetch(
      Const.URL_WS_LOGIN,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setApiKey(data.token);
      // setCheckPassword(false);
      // console.log(data.serial);
      // console.log(JSON.stringify(data));
      callbackFunction(data.token, "");
    })
    .catch(error=> {
      // console.error(error);
      setLoginError(true);
    });
  
  
    // if (!res.ok) throw new Error("error");
    // console.log(res);
    // console.log(res.json());
    // return res.json();
  };
  const handleSignup = () => {

  }
  const handleResetPass = () => {
    fetch(Const.URL_WS_RESET_PASS,
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:emailResetPass})
      }
    )
    .then(res => res.json())
    .then(data =>  {
      setConfirmReset(true);
    })
    .catch(err => {
      setResetError(true);
    })
  }
  const handleConfirmResetPass = () => {
    const body = { email: emailResetPass, code: resetCode, password: newPassword };
    console.log(body);
    fetch(Const.URL_WS_CONFIRM_RESET_PASS,
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    .then(res => res.json())
    .then(data =>  {
      console.log("OK - NewPassword");
      setApiKey(data.token);
      callbackFunction(data.token, "");
    })
    .catch(err => {
      setLoginError(true);
    })
  }
  return (
    <Container
      component="main"
      style={window.innerWidth < 1200 ? { width: "100%", padding:"0" } : { width: "30%" }}
    >
      <CssBaseline />
      {loginError && <Toast
        variant="outlined"
        severity="error"
        message={t("login_ko")}
        callback={() => {
          setLoginError(false);
        }}
      />}
      {resetError && <Toast
        variant="outlined"
        severity="error"
        message={t("login_ko_reset")}
        callback={() => {
          setResetError(false);
        }}
      />}
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
                onChange={(event) => {
                  setSigninEmail(event.target.value);
                  localStorage.setItem("email", event.target.value)
                }
                }
                defaultValue = {
                  localStorage.getItem("email")
                    ? localStorage.getItem("email")
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
                    setSigninPassword(event.target.value);
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
                  <center><NavLink to={"/"} onClick={()=>{setLogin(false);setSignup(false);setReset(true)}}>{t('reset_password')}</NavLink></center>
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
                  loadKeyApi();
                }}
              >
                {t("go_button")}
              </Button>
              
            </form>}
            {reset && <form
              style={{ marginTop: "5em" }}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="normal"
                fullWidth
                id="signup_firstname"
                placeholder="You'll receive an email at this address"
                label={t("username")}
                name="firstname"
                autoFocus 
                onChange={(event) => 
                  setEmailResetPass(event.target.value)
                }
                autoComplete="off"
                onKeyPress={(event)=>handleEnterToReset(event)}
              />
              {1 &&  
              <div style={{display: confirmReset ? "block":"none"}}>
                <TextField
                  disabled={confirmReset ? false:true}
                  margin="normal"
                  fullWidth
                  className="signup_email_container"
                  placeholder="Reset Code Received By Email"
                  label={t("rest_code")}
                  name="rest_code"
                  autoFocus 
                  onChange={(event) =>
                    setResetCode(event.target.value)
                  }
                  autoComplete="off"
                />
                <FormControl fullWidth className="signup_email_container" disabled={confirmReset ? false:true}>
                  <InputLabel htmlFor="signup_password" className="signup_password-label">{t("newPassword")}</InputLabel>
                  <Input
                    className="signup_password"
                    type={showResetPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowResetPassword(!showResetPassword)}
                        >
                          {showResetPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    onKeyPress={(event)=>handleEnterToConfirmReset(event)}
                  />
                </FormControl>
              </div>
              }
              
              <Router>
                <div style={{ marginTop: "1em", fontSize: window.innerWidth < 1200 ? "2.5em":"1em" }}>
                  <center><NavLink to={"/"} onClick={()=>{setLogin(true);setSignup(false);setReset(false)}}>{t('has_account')}</NavLink></center>
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
                  !resetCode ? handleResetPass():handleConfirmResetPass();
                }}
              >
                {t("reset_button")}
              </Button>
              
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
