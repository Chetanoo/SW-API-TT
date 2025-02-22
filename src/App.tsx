import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetails";
import { Layout, Typography } from "antd";
import NoPage from "./pages/NoPage";

const { Title } = Typography;
const { Header, Content } = Layout;

function App() {
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header-main">
        <Title level={3} className="header-title" onClick={() => navigate("/")}>
          Star Wars Api TT
        </Title>
      </Header>
      <Content
        style={{
          minWidth: "320px",
          minHeight: "100%",
          padding: "2rem",
        }}
      >
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
