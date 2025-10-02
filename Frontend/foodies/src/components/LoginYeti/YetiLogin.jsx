import React, { useContext, useEffect, useRef, useState } from 'react';
import './yeti.css';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { authController } from '../../controllers/authController';
import { StoreContext } from '../context/StoreContext';

const YetiLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  const [data, setData] = useState({ email: '', password: '' });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const onSuccess = (responseData) => {
      setToken(responseData.token);
      navigate('/');
    };
    
    const onError = (error) => {
      console.error('Login failed:', error);
    };
    
    await authController.login(data, onSuccess, onError);
  };

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mouthRef = useRef(null);
  const browLRef = useRef(null);
  const browRRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const glassesRef = useRef(null);
  const signInBtnRef = useRef(null);
  const resetBtnRef = useRef(null);

  useEffect(() => {
    const eyeR = document.querySelector('.eyeR');
    const eyeL = document.querySelector('.eyeL');
    const formContainer = document.querySelector('.yeti-form');

    const eyeFollow = (e) => {
      const bounds = formContainer.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percent = x / bounds.width;
      gsap.to([eyeL, eyeR], {
        x: (percent - 0.5) * 10,
        duration: 0.2
      });
    };

    const eyeDown = () => gsap.to([eyeL, eyeR], { y: 10, duration: 0.2 });
    const eyeReset = () => gsap.to([eyeL, eyeR], { y: 0, scale: 1, duration: 0.2 });
    const closeEyes = () => gsap.to([eyeL, eyeR], { scaleY: 0.1, y: 0, duration: 0.2 });
    const blink = () => gsap.to([eyeL, eyeR], { scaleY: 0.1, duration: 0.1, yoyo: true, repeat: 1 });

    const idleAnim = gsap.to(bodyRef.current, {
      y: -3,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });

    formContainer?.addEventListener('mousemove', eyeFollow);
    emailRef.current?.addEventListener('focus', eyeDown);
    emailRef.current?.addEventListener('blur', eyeReset);
    passwordRef.current?.addEventListener('focus', closeEyes);
    passwordRef.current?.addEventListener('blur', eyeReset);

    const blinkInterval = setInterval(() => {
      if (document.activeElement !== passwordRef.current) blink();
    }, Math.random() * 4000 + 2000);

    // Sunglasses hover
    const dropGlasses = () =>
      gsap.fromTo(glassesRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
    const liftGlasses = () =>
      gsap.to(glassesRef.current, { y: -30, opacity: 0, duration: 0.4 });

    signInBtnRef.current?.addEventListener('mouseenter', dropGlasses);
    signInBtnRef.current?.addEventListener('mouseleave', liftGlasses);

    // Nervous on reset
    const handleResetHover = () => {
      gsap.to([eyeL, eyeR], { x: -6, y: 4, duration: 0.3 });
      gsap.to([browLRef.current, browRRef.current], { y: 3, duration: 0.3 });
      gsap.to(mouthRef.current, {
        attr: { d: 'M90,113 Q100,110 110,113' },
        duration: 0.3
      });
    };

    const handleResetLeave = () => {
      gsap.to([eyeL, eyeR], { x: 0, y: 0, duration: 0.3 });
      gsap.to([browLRef.current, browRRef.current], { y: 0, duration: 0.3 });
      gsap.to(mouthRef.current, {
        attr: { d: 'M90,110 Q100,115 110,110' },
        duration: 0.3
      });
    };

    resetBtnRef.current?.addEventListener('mouseenter', handleResetHover);
    resetBtnRef.current?.addEventListener('mouseleave', handleResetLeave);

    return () => {
      clearInterval(blinkInterval);
      idleAnim.kill();
      formContainer?.removeEventListener('mousemove', eyeFollow);
      emailRef.current?.removeEventListener('focus', eyeDown);
      emailRef.current?.removeEventListener('blur', eyeReset);
      passwordRef.current?.removeEventListener('focus', closeEyes);
      passwordRef.current?.removeEventListener('blur', eyeReset);
      signInBtnRef.current?.removeEventListener('mouseenter', dropGlasses);
      signInBtnRef.current?.removeEventListener('mouseleave', liftGlasses);
      resetBtnRef.current?.removeEventListener('mouseenter', handleResetHover);
      resetBtnRef.current?.removeEventListener('mouseleave', handleResetLeave);
    };
  }, []);

  const handleYetiClick = () => {
    const eyeL = document.querySelector('.eyeL circle');
    const tl = gsap.timeline();

    tl.to(eyeL, {
      scaleY: 0.1,
      duration: 0.2,
      transformOrigin: 'center'
    })
      .to(mouthRef.current, {
        attr: { d: 'M85,108 Q100,130 115,108' },
        duration: 0.4
      }, 0)
      .to([browLRef.current, browRRef.current], {
        y: -6,
        rotation: -10,
        duration: 0.3
      }, 0)
      .to(headRef.current, {
        rotation: 8,
        y: -3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }, 0.05)
      .to(eyeL, {
        scaleY: 1,
        duration: 0.2,
        delay: 0.5
      })
      .to(mouthRef.current, {
        attr: { d: 'M90,110 Q100,115 110,110' },
        duration: 0.3
      })
      .to([browLRef.current, browRRef.current], {
        y: 0,
        rotation: 0,
        duration: 0.3
      });
  };

  return (
    <div className="yeti-login-container">
      <form className="yeti-form" onSubmit={onSubmitHandler}>
        <h2 className="form-title">Sign In</h2>

        <div className="svgContainer">
          <svg className="mySVG" viewBox="0 0 200 230">
            <g ref={bodyRef}>
              <g ref={headRef} onClick={handleYetiClick} style={{ cursor: 'pointer' }}>
                <circle cx="100" cy="100" r="80" fill="#1a1a1a" />
                <g className="eyeL"><circle cx="85.5" cy="78.5" r="5" fill="#F1FAEE" /></g>
                <g className="eyeR"><circle cx="114.5" cy="78.5" r="5" fill="#F1FAEE" /></g>

                <g className="brows">
                  <rect ref={browLRef} x="75" y="65" width="10" height="3" rx="1.5" fill="#E63946" />
                  <rect ref={browRRef} x="115" y="65" width="10" height="3" rx="1.5" fill="#E63946" />
                </g>

                <g className="mouth">
                  <path
                    ref={mouthRef}
                    d="M90,110 Q100,115 110,110"
                    fill="none"
                    stroke="#E63946"
                    strokeWidth="2"
                  />
                </g>

                <g ref={glassesRef} style={{ opacity: 0 }}>
                  <rect x="67" y="70" width="30" height="16" rx="4" fill="#000000" />
                  <rect x="103" y="70" width="30" height="16" rx="4" fill="#000000" />
                  <line x1="97" y1="78" x2="103" y2="78" stroke="#E63946" strokeWidth="2" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="inputGroup">
          <label>Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="buttonGroup">
          <button ref={signInBtnRef} className="btn-signin" type="submit">Sign In</button>
          <button ref={resetBtnRef} className="btn-reset" type="reset">Reset</button>
        </div>

        <p className="account-msg">
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default YetiLogin;
