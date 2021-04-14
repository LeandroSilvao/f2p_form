import { FormProvider } from './contexts/FormContexts';
import { ClientInfoProvider } from './contexts/ClientInfoContexts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from './form'

import './Global.css';

function App() {
  return (
    <FormProvider>
      <ClientInfoProvider>
        <ToastContainer
          position="top-right" autoClose={2500}
          hideProgressBar={false} newestOnTop={false}
          closeOnClick rtl={false} pauseOnHover={false}
          pauseOnVisibilityChange draggable
          pauseOnFocusLoss={false}
        />
        <Form />
      </ClientInfoProvider>
    </FormProvider>
  );
}

export default App;
