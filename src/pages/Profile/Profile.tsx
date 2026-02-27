import { useState, useEffect } from 'react';
import LoginPrompt from './elements/steps/LoginPrompt';
import PhoneInput from './elements/steps/PhoneInput';
import CodeVerification from './elements/steps/CodeVerification';
import AuthenticatedProfile from './elements/steps/AuthenticatedProfile';
import { useLoginUser } from '../../hooks/useData';
import { useAuth } from '../../context/AccessTokenContext';
import { useLocation } from 'react-router-dom';

type Step =
  | 'login-prompt'
  | 'phone-input'
  | 'code-verification'
  | 'authenticated';

function Profile() {
  const location = useLocation();
  const from = (location.state as any)?.from;

  const [currentStep, setCurrentStep] = useState<Step>(() => {
    if (from === 'orders') {
      return 'phone-input';
    }
    return 'login-prompt';
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  const { mutateAsync: loginUser, isPending } = useLoginUser();
  const { token, setToken, logout, user, refetchUser } = useAuth();

  useEffect(() => {
    if (token) {
      setCurrentStep('authenticated');
    }
  }, [token]);

  const handleLoginClick = () => {
    setCurrentStep('phone-input');
  };

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentStep('code-verification');
  };

  const handleCodeVerified = async () => {
    try {
      const jwt = await loginUser({
        phone: `7${phoneNumber}`,
      });

      if (!jwt) throw new Error('Login failed');

      setToken(jwt);

      refetchUser();

      setCurrentStep('authenticated');
    } catch (err) {
      console.error(err);
      alert('Ошибка входа');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentStep('login-prompt');
    setPhoneNumber('');
  };

  const handleBack = () => {
    if (currentStep === 'phone-input') {
      setCurrentStep('login-prompt');
    } else if (currentStep === 'code-verification') {
      setCurrentStep('phone-input');
    }
  };

  return (
    <div className='bg-[#F6F6F6] relative top-14 bottom-20'>
      {currentStep === 'login-prompt' && (
        <LoginPrompt onLoginClick={handleLoginClick} />
      )}

      {currentStep === 'phone-input' && (
        <PhoneInput onSubmit={handlePhoneSubmit} onBack={handleBack} />
      )}

      {currentStep === 'code-verification' && (
        <CodeVerification
          phoneNumber={phoneNumber}
          onVerified={handleCodeVerified}
          onBack={handleBack}
          isLoading={isPending}
        />
      )}

      {currentStep === 'authenticated' && (
        <AuthenticatedProfile user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default Profile;
