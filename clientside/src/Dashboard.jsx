import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import './custom.css';
import { Collapse } from 'react-bootstrap';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null); 
  const [feedback, setFeedback] = useState({}); 
  const navigate = useNavigate();

  const handleSubmitQuiz = (quizId) => {
    const startTime = Date.now(); 
    const answers = Array.from(document.querySelectorAll(`#quiz-${quizId} input`))
      .map(input => input.value.trim());
    const email = localStorage.getItem("userId");

    axios.post(`http://localhost:3001/api/quiz/submit`, {
      quizId,
      answers,
      startTime,
      email
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => {
      setFeedback(prev => ({
        ...prev,
        [quizId]: {
          ...response.data.feedback,
          score: response.data.score // Add score to feedback
        }
      }));
      console.log("Feedback after submission:", response.data.feedback);
      window.location.reload(); // This line will refresh the page

    })
    .catch(error => console.error("Error submitting quiz:", error));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      navigate('/login');
      return;
    }
  
    // Fetch user data
    axios.get('http://localhost:3001/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const user = response.data;
      localStorage.setItem("userId", user.email);
      setUserData(user);

      // Extract quiz IDs of quizzes the user has already participated in
      const participatedQuizIds = new Set(
        user.quizzes.map(quiz => quiz.quizId.toString())
      );
  // Fetch all quizzes available for the user's class
// Correct quiz fetching and separating logic inside useEffect
axios.get(`http://localhost:3001/api/quiz?class=${user.classd}`, {
  headers: { Authorization: `Bearer ${token}` },
})
.then(quizResponse => {
  const allQuizzes = quizResponse.data;

  // Separate quizzes into available and participated
  const filteredQuizzes = allQuizzes.filter(
    quiz => !participatedQuizIds.has(quiz._id.toString())
  );

  const participatedQuizzes = user.quizzes.map(quiz => {
    const matchedQuiz = allQuizzes.find(q => q._id === quiz.quizId);
    return {
      ...quiz, // user data like score
      title: matchedQuiz?.title,
      totalMarks: matchedQuiz?.totalMarks,
    };
  });

  setQuizzes(filteredQuizzes);
  console.log(filteredQuizzes)
 //tempo sol//
 /**  setUserData(prevData => ({
    ...prevData,
    quizzes: participatedQuizzes,
  }));**/
})
  .catch(err => console.error("Error fetching quizzes:", err));
})
.catch(error => {
  console.error("Error fetching user data:", error);
  navigate('/login');
});
}, [navigate]);

  const handleParticipate = (quizId) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveQuiz(activeQuiz === quizId ? null : quizId);
    }, 1000); 
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
        <nav className="--card --bg-dark p-3" style={{ minWidth: '250px', minHeight: '500px' }} role="tablist">
          <h4 className="text-center --text-primary --section-text">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="#profile" data-bs-toggle="tab" role="tab">
                <i className="bi bi-person-fill"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#quizzes" data-bs-toggle="tab" role="tab">
                <i className="bi bi-file-earmark-text"></i> Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#events" data-bs-toggle="tab" role="tab">
                <i className="bi bi-calendar-event"></i> Events
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-grow-1 p-4 --text-secondary">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade" id="profile" role="tabpanel">
              <h3 className="--text-primary --section-text">Profile</h3>
              {userData ? (
                <div>
                  <p><strong class="--text-primary">Name:</strong> {userData.name}</p>
                  <p><strong class="--text-primary">Email:</strong> {userData.email}</p>
                  <p><strong class="--text-primary">Institute:</strong> {userData.institute}</p>
                  <p><strong class="--text-primary">Class:</strong> {userData.classd}</p>
                  <p><strong class="--text-primary">Roll:</strong> {userData.roll}</p>
                  <p><strong class="--text-primary">Section:</strong> {userData.section}</p>
                  <p><strong class="--text-primary">Phone:</strong> {userData.phone}</p>
                </div>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>

            <div className="tab-pane fade" id="quizzes" role="tabpanel">
            <h3 class="--text-primary --section-text">Quizzes</h3>
  {loading ? (
    <div className="skeleton"></div>
  ) : (
    <>
      <h4 className="mt-4">Available Quizzes</h4>
      {(activeQuiz ? quizzes.filter(quiz => quiz._id === activeQuiz) : quizzes)
      .map((quiz) => (
        <div key={quiz._id} className="mb-3 card">
          <div className="card-body">
            <h5 className="card-title">{quiz.title || "Untitled Quiz"}</h5>
            {/*Time: {quiz.timeAllocation} mins |*/}
            <p> Total Marks: {quiz.totalMarks}</p>
            <button
              className="btn btn-primary mb-2"
              onClick={() => handleParticipate(quiz._id)}
            >
              {activeQuiz === quiz._id ? "Hide Quiz" : "Participate"}
            </button>
            <Collapse in={activeQuiz === quiz._id}>
              <div id={`quiz-${quiz._id}`}>
                {quiz.questions.map((question, idx) => (
                  <div key={idx} className="mb-2">
                    <strong>Q{idx + 1}:</strong> {question.questionText}
                    <input type="text" className="form-control mt-2" placeholder="Your answer" />
                    {feedback[quiz._id]?.[idx] && (
                      <div className="feedback mt-2">
                        {feedback[quiz._id][idx].isCorrect ? (
                          <span className="text-success">Correct</span>
                        ) : (
                          <span className="text-danger">
                            Incorrect. Correct answer: {feedback[quiz._id][idx].correctAnswer}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <button className="btn btn-success mt-2" onClick={() => handleSubmitQuiz(quiz._id)}>
                  Submit Quiz
                </button>
                {feedback[quiz._id] && (
                  <div className="mt-3">
                    <strong>Total Score:</strong> {feedback[quiz._id]?.score || 0} / {quiz.totalMarks}
                  </div>
                )}
              </div>
            </Collapse>
          </div>
        </div>
      ))}

{/* Section for Participated Quizzes */}
<h4 className="mt-5">Participated Quizzes</h4>
{loading ? ( // Assuming you have a loading state
  <p>Loading quizzes...</p>
) : userData?.quizzes.length > 0 ? (
  userData.quizzes.map(participated => (
    <div key={participated.quizId || participated._id} className="mb-3 card">
      <div className="card-body">
        <h5 className="card-title">{participated.title || "Untitled Quiz Title"}</h5>
        <p>
          Score: {participated.score}
        </p>
      </div>
    </div>
  ))
) : (
  <p>No quizzes participated in yet.</p>
)}
</>
  )}
            </div>

            <div className="tab-pane fade" id="events" role="tabpanel">
              <h3 class="--text-primary --section-text">Events</h3>
              <p>Upcoming events will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
