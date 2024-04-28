import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FinancialSupportCard({ title, description, details, eligibility, provider, link }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" onClick={handleShowModal}>Details</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{details}</p>
          <p>Eligibility: {eligibility}</p>
          <p>Provider: {provider}</p>
          <p>For more information, visit: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function FinancialSupport() {
  const financialSupportData = [
    {
      id: 1,
      title: 'Financial Institution A',
      description: 'Description of Financial Institution A',
      details: 'Detailed information about Financial Institution A and its support programs.',
      eligibility: 'Eligibility criteria for this program.',
      provider: 'Government/NGO/Private Financial Institution',
      link: 'https://www.example.com/financial-institution-a',
    },
    {
      id: 2,
      title: 'Government Program X',
      description: 'Description of Government Program X',
      details: 'Detailed information about Government Program X and its support initiatives.',
      eligibility: 'Eligibility criteria for this program.',
      provider: 'Government',
      link: 'https://www.example.com/government-program-x',
    },
    {
      id: 3,
      title: 'Government Subsidies for Farmers',
      description: 'Subsidies provided by the government to support farmers.',
      details: 'Government subsidies for farmers aim to provide financial assistance to farmers for various activities such as purchasing agricultural equipment, seeds, fertilizers, and other inputs. Eligibility criteria for these subsidies usually include proof of being a registered farmer, land ownership or lease documents, and compliance with environmental regulations. The interest rates for loans provided under these subsidies are often lower than market rates, and repayment terms are flexible to accommodate the seasonal nature of farming. Farmers interested in availing these subsidies can apply through designated government agencies or agricultural departments at the state or national level.',
      eligibility: 'Proof of being a registered farmer, land ownership or lease documents, compliance with environmental regulations.',
      provider: 'Government',
      link: 'https://www.example.com/government-subsidies-for-farmers',
    },
    // Add more financial support data as needed
  ];

  return (
    <div>
      <h2>Financial Support</h2>
      <div className="row">
        {financialSupportData.map(item => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-3">
            <FinancialSupportCard
              title={item.title}
              description={item.description}
              details={item.details}
              eligibility={item.eligibility}
              provider={item.provider}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialSupport;