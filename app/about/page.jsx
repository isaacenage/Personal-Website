import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import AboutServices from '../components/AboutServices'
import Skills from '../components/Skills'
import Counter from '../components/Counter'
import EducationExperience from '../components/EducationExperience'

export default function AboutPage() {
  return (
    <div className="spybody index-11" data-spy="scroll" data-bs-target=".navbar-example2" data-offset="150">
      <Header />
      <Breadcrumb title="About Me" />
      <AboutServices />
      <Skills />
      <Counter />
      <EducationExperience />
      <Footer />
    </div>
  )
}
