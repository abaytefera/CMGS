import React from 'react'
import HeaderHero from '../../Component/CitizenComponent/HomeComponet/HeaderHero'

import AboutSection from '../../Component/CitizenComponent/HomeComponet/About'
import ProcessSection from '../../Component/CitizenComponent/HomeComponet/ProcessSection'
import ImpactSection from '../../Component/CitizenComponent/HomeComponet/ImpactSection'
import WhyChooseSection from '../../Component/CitizenComponent/HomeComponet/WhyChooseSection'
import ApproachSection from '../../Component/CitizenComponent/HomeComponet/ApproachSection'
import TestimonialsSection from '../../Component/CitizenComponent/HomeComponet/TestimonialsSection'
import UserRolesSection from '../../Component/CitizenComponent/HomeComponet/UserRolesSection'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
   <HeaderHero ></HeaderHero>
<AboutSection></AboutSection>
<ProcessSection></ProcessSection>
<ImpactSection></ImpactSection>
<WhyChooseSection></WhyChooseSection>
<ApproachSection></ApproachSection>

<TestimonialsSection></TestimonialsSection>
    </div>
  )
}

export default Home
