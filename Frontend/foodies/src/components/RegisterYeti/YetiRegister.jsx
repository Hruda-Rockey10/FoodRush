import React, { useEffect, useRef, useState } from 'react';
import './yeti.css';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { authController } from '../../controllers/authController';

const Register = () => {
  const navigate = useNavigate();


  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mouthRef = useRef(null);
  const browLRef = useRef(null);
  const browRRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const signUpBtnRef = useRef(null);
  const resetBtnRef = useRef(null);
  const glassesRef = useRef(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    
    const onSuccess = () => {
      navigate("/login");
    };
    
    const onError = (error) => {
      console.error('Registration failed:', error);
    };
    
    await authController.registerUser(data, onSuccess, onError);
  };

  useEffect(() => {
    const eyeR = document.querySelector('.eyeR');
    const eyeL = document.querySelector('.eyeL');
    const formContainer = document.querySelector('.yeti-form');

    const eyeFollow = (e) => {
      const bounds = formContainer.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percent = x / bounds.width;
      gsap.to([eyeL, eyeR], { x: (percent - 0.5) * 10, duration: 0.2 });
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

    const handleNameInput = (e) => {
      const value = e.target.value.trim();
      const smile = value.length > 1
        ? 'M90,108 Q100,120 110,108'
        : 'M90,110 Q100,115 110,110';
      gsap.to(mouthRef.current, { attr: { d: smile }, duration: 0.3 });
    };

    formContainer.addEventListener('mousemove', eyeFollow);
    emailRef.current.addEventListener('focus', eyeDown);
    emailRef.current.addEventListener('blur', eyeReset);
    nameRef.current.addEventListener('focus', eyeDown);
    nameRef.current.addEventListener('blur', eyeReset);
    nameRef.current.addEventListener('input', handleNameInput);
    passwordRef.current.addEventListener('focus', closeEyes);
    passwordRef.current.addEventListener('blur', eyeReset);

    const blinkInterval = setInterval(() => {
      if (document.activeElement !== passwordRef.current) blink();
    }, Math.random() * 4000 + 2000);

    const btn = signUpBtnRef.current;
    const glasses = glassesRef.current;

    const dropGlasses = () =>
      gsap.fromTo(glasses, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
    const liftGlasses = () =>
      gsap.to(glasses, { y: -30, opacity: 0, duration: 0.4 });

    btn.addEventListener('mouseenter', dropGlasses);
    btn.addEventListener('mouseleave', liftGlasses);

    const resetBtn = resetBtnRef.current;
    const handleResetHover = () => {
      gsap.to(headRef.current, { x: -6, duration: 0.2 });
      gsap.to([eyeL, eyeR], { x: -4, duration: 0.2 });
      gsap.to([browLRef.current, browRRef.current], { y: 3, duration: 0.2 });
      gsap.to(mouthRef.current, {
        attr: { d: 'M90,112 Q100,110 110,112' },
        duration: 0.3
      });
    };
    const handleResetLeave = () => {
      gsap.to(headRef.current, { x: 0, duration: 0.3 });
      gsap.to([eyeL, eyeR], { x: 0, duration: 0.3 });
      gsap.to([browLRef.current, browRRef.current], { y: 0, duration: 0.3 });
      gsap.to(mouthRef.current, {
        attr: { d: 'M90,110 Q100,115 110,110' },
        duration: 0.3
      });
    };

    resetBtn.addEventListener('mouseenter', handleResetHover);
    resetBtn.addEventListener('mouseleave', handleResetLeave);

    return () => {
      clearInterval(blinkInterval);
      idleAnim.kill();
      formContainer.removeEventListener('mousemove', eyeFollow);
      btn.removeEventListener('mouseenter', dropGlasses);
      btn.removeEventListener('mouseleave', liftGlasses);
      resetBtn.removeEventListener('mouseenter', handleResetHover);
      resetBtn.removeEventListener('mouseleave', handleResetLeave);
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
        <h2 className="form-title">Sign Up</h2>

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
                  <path ref={mouthRef} d="M90,110 Q100,115 110,110" fill="none" stroke="#E63946" strokeWidth="2" />
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
          <label>Full Name</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Email address</label>
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
          <button ref={signUpBtnRef} className="btn-signin" type="submit">Sign Up</button>
          <button ref={resetBtnRef} className="btn-reset" type="reset">Reset</button>
        </div>

        <p className="account-msg">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
