import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card} from "react-bootstrap";
import useAuth from '../../auth/useAuth';
import Footer from '../../components/Footer';
import EditarPerfil from './Component/Edit_profile';
import Sidebar from './Component/Sidebar';

const AccountPage = () => {
  const { user } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleContent = () => {
    setShowEditProfile(prev => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) { // Ajusta el ancho según lo necesites
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a la función al cargar el componente

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const keyframesWalk = `
    @keyframes walk {
      0% { left: -20%; }
      100% { left: 120%; }
    }
  `;

  return (
    <Container fluid style={{ margin: 0, padding: 0, height: '100vh' }}>
      <Row style={{ margin: 0, padding: 0, height: '100%' }}>
        {isSidebarVisible && (
          <Col xs={12} md={3} style={{ padding: 0, height: '100%', overflowY: 'auto' }}>
            <Sidebar toggleContent={toggleContent} />
          </Col>
        )}
        <Col xs={12} md={isSidebarVisible ? 8 : 12} style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundImage: 'url(/img/cecar2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}>
          <style>{keyframesWalk}</style>
          <Card style={{ width: '100%', maxWidth: '800px', marginBottom: '20px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', position: 'relative', overflow: 'hidden', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Card.Header as="h1" style={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center', padding: '10px 0', position: 'relative', borderRadius: '15px 15px 0 0' }}>
              Mi Cuenta
              {!showEditProfile && (
                <div style={{ position: 'absolute', top: '10px', left: '0', width: '100%', height: '150px', overflow: 'hidden', zIndex: '0' }}>
                  <img src="/img/tumblr_npop0e6Web1tac9dxo1_1280-ezgif.com-gif-to-webp-converter.webp" alt="Mono Caminando" style={{ position: 'absolute', top: '0', width: '150px', height: '150px', animation: 'walk 10s linear infinite' }} />
                </div>
              )}
            </Card.Header>
            <Card.Body style={{ textAlign: 'center', position: 'relative' }}>
              {showEditProfile ? (
                <EditarPerfil user={user} />
              ) : (
                <>
                  <Card.Title style={{ color: '#343a40' }}>Bienvenido, {user.name}</Card.Title>
                  <Card.Text style={{ color: '#555', fontSize: '1.1em' }}>
                    Aquí puedes gestionar toda la información relacionada con tu cuenta. Usa el sidebar para acceder a diferentes secciones como Editar Perfil, Cambiar Contraseña, Calendario y Notificaciones.
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default AccountPage;
