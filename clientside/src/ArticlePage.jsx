import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './ArticlePage.css';
import Footer from './Footer';
import Navbar from './Navbar';
function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Fetch articles from the backend
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/article');
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
        <Navbar />
    <div className="article-page">
      <h2 className="--text-primary --section-text">Articles</h2>
      <div className="article-cards">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article._id} className="mb-4">
              <Card.Img variant="top" src={article.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>by {article.writerName}</Card.Text>
                <Card.Text>{article.publishDate}</Card.Text>
                <Button variant="primary" onClick={() => handleReadMore(article)}>Read More</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </div>

      {selectedArticle && (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedArticle.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="img-fluid mb-4" />
            <p><strong>Author:</strong> {selectedArticle.writerName}</p>
            <p><strong>Date:</strong> {selectedArticle.publishDate}</p>
            <p>{selectedArticle.text}</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default ArticlePage;
