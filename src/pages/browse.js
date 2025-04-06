import BrowseService from '@/components/BrowseService';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


export default function DbPspWebsite() {
  return (
    <div className="min-h-screen bg-[#F9F9ED]">
      <Header />
      <Navbar />
      <div className="flex">
        {/* <Sidebar /> */}
        <BrowseService/>
      </div>
    </div>
  );
}