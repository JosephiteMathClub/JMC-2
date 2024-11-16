import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Modal, Alert, Spinner, Nav, Tab, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';  // Assume this file contains blue and black theme styling
import './custom.css'
import './app.css'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const AdminDashboard = () => {
  const [articleDetails, setArticleDetails] = useState({
    title: '',
    text: '',
    imageUrl: '',
    writerName: '',
    publishDate: ''
  });
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    timeAllocation: '',
    totalMarks: '',
    allowedClasses: [],
    questions: []
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizId, setExpandedQuizId] = useState(null); // Track the expanded quiz

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);
  useEffect(() => {
    fetchQuizzes();


    const adminToken = localStorage.getItem('adminToken');

    // Check if the adminToken is not present
    if (!adminToken) {
      // Redirect to the admin login page or any other appropriate route
      navigate('/admin/login'); // Change this to your actual login route
    }
  }, [navigate]);
  
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/quiz');
      console.log(response.data)
      setQuizzes(response.data); // Assuming response.data is an array of quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }; 
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/article');
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleDetails({ ...articleDetails, [name]: value });
  };

  const handleAddArticle = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/adminlogin');
      return;
    }

    try {
      await axios.post('http://localhost:3001/article', articleDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback({ type: 'success', message: "Article published successfully!" });
      fetchArticles();
      setArticleDetails({ title: '', text: '', imageUrl: '', writerName: '', publishDate: '' });
    } catch (error) {
      console.error("Error adding article:", error);
      setFeedback({ type: 'danger', message: "Error adding article." });
    }
  };


  // Quiz Functions
  const handleQuizInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };

  const handleClassToggle = (classNum) => {
    setQuizDetails((prevDetails) => {
      const newallowedClasses = prevDetails.allowedClasses.includes(classNum)
        ? prevDetails.allowedClasses.filter((c) => c !== classNum)
        : [...prevDetails.allowedClasses, classNum];
      return { ...prevDetails, allowedClasses: newallowedClasses };
    });
  };

  const addQuestion = () => {
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      questions: [...prevDetails.questions, { questionText: '', answer: '', marks: 0 }],
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = quizDetails.questions.map((q, i) => (
      i === index ? { ...q, [field]: value } : q
    ));
    setQuizDetails({ ...quizDetails, questions: updatedQuestions });
  };

  const handleSaveQuiz = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/adminlogin');
      return;
    }

    try {
      console.log(quizDetails);

      await axios.post('http://localhost:3001/api/quiz', quizDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback({ type: 'success', message: "Quiz saved successfully!" });
      setQuizDetails({ title: '', timeAllocation: '', allowedClasses: [], questions: [] });
    } catch (error) {
      console.error("Error saving quiz:", error);
      setFeedback({ type: 'danger', message: "Error saving quiz." });
    }
  };

  return (
    <div>
    <Container className="admin-dashboard">
      <h2 className="text-primary">Admin Dashboard</h2>
      <Tab.Container defaultActiveKey="addArticles">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="addArticles">Add Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="addQuizzes">Add Quizzes</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Add Articles Tab */}
          <Tab.Pane eventKey="addArticles">
            <h3>Add New Article</h3>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={articleDetails.title} onChange={handleArticleInputChange} required/>
              </Form.Group>
              <Form.Group controlId="imageUrl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="imageUrl" value={articleDetails.imageUrl} onChange={handleArticleInputChange} required/>
              </Form.Group>
              <Form.Group controlId="text">
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={3} name="text" value={articleDetails.text} onChange={handleArticleInputChange} required/>
              </Form.Group>
              <Form.Group controlId="writerName">
                <Form.Label>Writer's Name</Form.Label>
                <Form.Control type="text" name="writerName" value={articleDetails.writerName} onChange={handleArticleInputChange} required/>
              </Form.Group>
              <Form.Group controlId="publishDate">
                <Form.Label>Publish Date</Form.Label>
                <Form.Control type="date" name="publishDate" value={articleDetails.publishDate} onChange={handleArticleInputChange} required/>
              </Form.Group>
              <br></br>
              <Button className='text-center' variant="primary" onClick={handleAddArticle} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Publish Article'}
              </Button>
              {feedback && <Alert variant={feedback.type} className="mt-3">{feedback.message}</Alert>}
             <br></br>
             <br></br>
             <div className="article-cards">
              <h2>All Articles</h2>
              <div className="card-deck">

      {articles.map(article => (
        <Card key={article._id} className="my-2">
           <Card.Img
                          variant="top"
                          src={article.imageUrl}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle>by {article.writerName} on {article.publishDate}</Card.Subtitle>
            <Card.Text>
              {expandedArticleId === article._id
                ? article.text
                : `${article.text.slice(0, 100)}...`}
            </Card.Text>
            <Button onClick={() => toggleArticleExpansion(article._id)}>
              {expandedArticleId === article._id ? "Show Less" : "Read More"}
            </Button>
          </Card.Body>
          
          {/* Expanded View in Modal */}
          <Modal
            show={expandedArticleId === article._id}
            onHide={() => setExpandedArticleId(null)}
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>{article.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={article.imageUrl} alt="Article" className="img-fluid mb-3" />
              <p>{article.text}</p>
              <p>Published on: {article.publishDate}</p>
              <p>By: {article.writerName}</p>
            </Modal.Body>
          </Modal>
        </Card>
      ))}
            </div>
            </div>
            </Form>
          </Tab.Pane>

          {/* Add Quizzes Tab */}
          <Tab.Pane eventKey="addQuizzes">
            <h3>Add New Quiz</h3>
            <Form>
              <Form.Group controlId="quizTitle">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control type="text" name="title" value={quizDetails.title} onChange={handleQuizInputChange} />
              </Form.Group>
              <Form.Group controlId="timeAllocation">
                <Form.Label>Time Allocation (minutes)</Form.Label>
                <Form.Control type="number" name="timeAllocation" value={quizDetails.timeAllocation} onChange={handleQuizInputChange} />
              </Form.Group>
              <Form.Label>Classes Allowed</Form.Label>
              <div className="mb-3">
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                  <Form.Check
                    inline
                    label={classNum}
                    type="checkbox"
                    checked={quizDetails.allowedClasses.includes(classNum)}
                    onChange={() => handleClassToggle(classNum)}
                    key={classNum}
                  />
                ))}
              </div>
              <h4>Questions</h4>
              {quizDetails.questions.map((q, index) => (
                <div key={index} className="question-section">
                  <Form.Group controlId={`question${index}`}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control type="text" value={q.questionText} onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId={`answer${index}`}>
                    <Form.Label>Answer</Form.Label>
                    <Form.Control type="text" value={q.answer} onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId={`marks${index}`}>
                    <Form.Label>Marks</Form.Label>
                    <Form.Control type="number" value={q.marks} onChange={(e) => handleQuestionChange(index, 'marks', parseInt(e.target.value))} />
                  </Form.Group>
                </div>
              ))}
              <br></br>
              <Button variant="info" onClick={addQuestion}>Add Question</Button><br></br>
              <Button variant="primary" className="mt-3" onClick={handleSaveQuiz}>Save Quiz</Button>
              {feedback && <Alert variant={feedback.type} className="mt-3">{feedback.message}</Alert>}
{/*Quiz fetched*/}
<h3>All Quizzes</h3>

{quizzes.length === 0 ? (
              <p>No quizzes available.</p>
            ) : (
              quizzes.map((quiz) => (
                <Card key={quiz._id} className="my-2">
                  <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Subtitle>Questions: {quiz.questions.length}</Card.Subtitle>
                    <Card.Text>
                      <Button
                        variant="link"
                        onClick={() => setExpandedQuizId(expandedQuizId === quiz._id ? null : quiz._id)}
                      >
                        {expandedQuizId === quiz._id ? 'Hide Questions' : 'Show Questions'}
                      </Button>
                    </Card.Text>
                    {expandedQuizId === quiz._id && (
                      <div>
                        {quiz.questions.map((question, index) => (
                          <div key={index} className="mb-2">
                            <strong>Question {index + 1}:</strong> {question.questionText}
                            <br />
                            <strong>Answer:</strong> {question.answer}
                          </div>
                        ))}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            )}


            </Form>
          </Tab.Pane>

        </Tab.Content>
      </Tab.Container>


    </Container>

    
    <Footer />
  </div>
  );
};
export default AdminDashboard;
