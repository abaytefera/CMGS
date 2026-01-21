import { useEffect } from 'react';
import Feedback from '../../Component/CitizenComponent/FeedbackPageComponent/Feedback';
import Footer from '../../Component/CitizenComponent/Footer';
import Header from '../../Component/CitizenComponent/Header';
const FeedbackPage = () => {
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='space-y-20'>
        <Header></Header>
      <Feedback></Feedback>
    <Footer></Footer>
    </div>
  );
};

export default FeedbackPage;