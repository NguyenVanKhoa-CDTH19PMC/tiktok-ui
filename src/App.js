import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { publicRoutes } from './routes';
import DefaultLayout from '~/layout';
function App() {
  document.title = 'Tiktok Clone';

  useEffect(() => {
    document.title = 'Tiktok Clone';
  }, []);

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
