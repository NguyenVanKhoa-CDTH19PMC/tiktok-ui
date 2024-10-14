import { Link } from 'react-router-dom';

function Home() {
  return (
    <h2>
      <Link to="/@user123">Xem trang cá nhân của User123</Link>
    </h2>
  );
}

export default Home;
