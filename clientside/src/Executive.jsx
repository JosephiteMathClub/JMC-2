import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from './Footer';
import './Executive.css';
import Navbar from './Navbar';

const PaginationButtons = ({ activePanel, setActivePanel }) => (
  <div className="pagination d-flex justify-content-center my-4">
    <button
      className={`btn btn-outline-light mx-2 ${activePanel === 'current' ? 'active' : ''}`}
      onClick={() => setActivePanel('current')}
    >
      Current
    </button>
    <button
      className={`btn btn-outline-light mx-2 ${activePanel === 'recent' ? 'active' : ''}`}
      onClick={() => setActivePanel('recent')}
    >
      Recent
    </button>
    <button
      className={`btn btn-outline-light mx-2 ${activePanel === 'former' ? 'active' : ''}`}
      onClick={() => setActivePanel('former')}
    >
      Former
    </button>
  </div>
);

const ExecutiveMemberCard = ({ imgSrc, name, position }) => (
  <div className="glass-card col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    <div className="card-div">
      <img src={imgSrc} alt={`${name}`} className="card-img img-fluid rounded" />
    </div>
    <div className="content mt-3 text-center">
      <h2 className="h5 text-warning">{name}</h2>
      <p className="text-light">{position}</p>
    </div>
  </div>
);

const ExecutivePanel = ({ title, members }) => (
  <div className="section">
    <h2 className="section-title text-center mb-4" style={{ fontWeight: 'lighter' }}>{title}</h2>
    <div className="container">
      <div className="row justify-content-center">
        {members.map((member, index) => (
          <ExecutiveMemberCard
            key={index}
            imgSrc={member.imgSrc}
            name={member.name}
            position={member.position}
          />
        ))}
      </div>
    </div>
  </div>
);

const Executive = () => {
  const [activePanel, setActivePanel] = useState('current');

  const currentPanel = [
    { imgSrc: 'ec/one.jpg', name: 'Tahmid Alam', position: 'President' },
    { imgSrc: 'ec/two.jpg', name: 'Taseen Ehfaz', position: 'President(programme)' },
    { imgSrc: 'ec/three.jpg', name: 'Junaed Abid Ehad', position: 'Deputy President' },
    { imgSrc: 'ec/four.jpg', name: 'Arijit Ghosh', position: 'Deputy President' },
    { imgSrc: 'ec/five.jpg', name: 'Arafat Karim Rahat', position: 'General Secretary' },
    { imgSrc: 'ec/six.jpg', name: 'Al Mustasi Arnob', position: 'Vice President' },
    { imgSrc: 'ec/seven.jpg', name: 'Akib Alwan', position: 'Vice President' },
    { imgSrc: 'ec/eight.jpg', name: 'Fahim Mehtab Prottoy', position: 'Vice President' },
    { imgSrc: 'ec/nine.jpg', name: 'Raiyan Ahmad', position: 'Vice President' },
    { imgSrc: 'ec/ten.jpg', name: 'Bikram Roy', position: 'Vice President' },
    { imgSrc: 'ec/eleven.jpg', name: 'Orlin Aurum', position: 'Vice President' },
    { imgSrc: 'ec/twelve.jpg', name: 'Hanjala Tahmid', position: 'Vice President' },
  ];

  const recentPanel = [
    { imgSrc: 'ec/former/one.jpg', name: 'Rakibul Islam Rony', position: 'President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Ishmaam Zarif', position: 'Deputy President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Md Ashfaqul Hasan', position: 'Vice President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Tahsin Abdullah', position: 'Vice President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Iftakhar Tausif Nur', position: 'Vice President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Arafat Ahmed Rony', position: 'Vice President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Hasin Israq', position: 'Vice President' },
    { imgSrc: 'ec/former/one.jpg', name: 'Tahmid Rahman', position: 'Asst. General Secretary' },
    { imgSrc: 'ec/former/one.jpg', name: 'Aditto Saha', position: 'Asst. General Secretary' },
    { imgSrc: 'ec/former/one.jpg', name: 'Mahir Tajwar', position: 'General Secretary' },
  ];

  const formerPanel = []; // Add any members you wish to display in this panel

  return (
    <div>
      <Navbar />
      <h2 className="section-title text-center" style={{ paddingTop: '18vh' }}>Executive Members</h2>
      <PaginationButtons activePanel={activePanel} setActivePanel={setActivePanel} />
      {activePanel === 'current' && <ExecutivePanel title="Executive Panel 23-24" members={currentPanel} />}
      {activePanel === 'recent' && <ExecutivePanel title="Executive Panel 22-23" members={recentPanel} />}
      {activePanel === 'former' && <ExecutivePanel title="Executive Panel - Former Members" members={formerPanel} />}
      <Footer />
    </div>
  );
};

export default Executive;
