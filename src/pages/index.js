import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

export default function DbPspWebsite() {
  return (
    <div className="min-h-screen bg-pink-100">
      <Header />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}