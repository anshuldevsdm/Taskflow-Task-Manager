import { useRef, useState } from "react";
import { DEMO_CREDENTIALS } from "../../constants/app";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icon";

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const passed = username.trim() === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
    if (!passed) {
      setError(true);
      usernameRef.current?.focus();
      return;
    }
    setError(false);
    onLogin();
  };

  return (
    <section className="login-screen" aria-labelledby="loginHeading">
      <div className="login-branding">
        <Brand light />
        <div className="brand-copy">
          <p className="eyebrow">Your work, in perfect flow</p>
          <h1>Plan smarter.<br />Get more done.</h1>
          <p>Bring clarity to every project, focus to every day, and momentum to your best work.</p>
        </div>
        <div className="workflow-card" aria-hidden="true">
          <div className="workflow-heading"><span>Today’s progress</span><strong>78%</strong></div>
          <div className="progress-track"><span /></div>
          <div className="workflow-rows">
            <div><span className="mini-check is-done"><Icon name="check" /></span><span>Product roadmap</span><small>Done</small></div>
            <div><span className="mini-check is-doing" /><span>Design review</span><small>In progress</small></div>
            <div><span className="mini-check" /><span>Team sync notes</span><small>Up next</small></div>
          </div>
        </div>
        <p className="brand-footer">© 2026 TaskFlow, Inc. Built for focused teams.</p>
        <span className="orb orb-one" /><span className="orb orb-two" /><span className="dots" />
      </div>

      <div className="login-panel">
        <form className="login-card" onSubmit={submit} noValidate>
          <div className="mobile-brand"><span className="logo-mark"><Icon name="check" /></span><span>TaskFlow</span></div>
          <div className="login-intro">
            <p className="eyebrow">Welcome back</p>
            <h2 id="loginHeading">Sign in to TaskFlow</h2>
            <p>Enter your details to continue to your workspace.</p>
          </div>
          <p className={`form-alert ${error ? "show" : ""}`} role="alert" aria-live="polite">
            {error ? "That username or password doesn’t look right. Please try again." : ""}
          </p>
          <div className={`form-field ${error ? "invalid" : ""}`}>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} id="username" name="username" type="text" autoComplete="username" placeholder="Enter your username" value={username} onChange={(event) => { setUsername(event.target.value); setError(false); }} />
          </div>
          <div className={`form-field ${error ? "invalid" : ""}`}>
            <div className="label-row"><label htmlFor="password">Password</label></div>
            <div className="password-wrap">
              <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => { setPassword(event.target.value); setError(false); }} />
              <button className="icon-button password-toggle" type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>
                <Icon name={showPassword ? "eye-off" : "eye"} />
              </button>
            </div>
          </div>
          <button className="button button-primary button-wide" type="submit">Sign in <Icon name="arrow" /></button>
          <p className="demo-note"><span>Demo access</span> admin / admin123</p>
        </form>
      </div>
    </section>
  );
}
