import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle'
import StudentLogin from './features/auth/components/StudentLogin'
import Signup from './features/auth/components/Signup'
import ForgotPassword from './features/auth/components/ForgotPassword'
import Home from './features/auth/components/Home'
import FormList from './features/auth/components/FormList'; 

import AboutProgram from './features/auth/components/AboutProgram';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  useTitle('Admissions')
  
  return (
    <>
    <ToastContainer position='top-center' />
    <Routes>
      
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formlist" element={<FormList />} />
        
        <Route path="/aboutprogram" element={<AboutProgram />} />
        
        
        
        
        {/* Protected Routes */}
        <Route  element={<PersistLogin />} >
        <Route  element={<RequireAuth allowedRoles={[...Object.values(ROLES) ]} />} > 
        {/* We can write this [...Object.values(ROLES) ] also as [ROLES.Admin,ROLES.Employee,ROLES.Manager]*/}
        <Route  element={<Prefetch />} >

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route  element={<RequireAuth allowedRoles={[ROLES.Admin,  ROLES.Manager ]} />} > 
          {/* We use only these roles because we want to access users only by admin and manager*/}
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path= ":id" element = { < EditUser />} />
            <Route path= "new" element = { < NewUserForm />} />
          </Route> 
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path= ":id" element = { < EditNote />} />
            <Route path= "new" element = { < NewNote />} />
          </Route>

        </Route>{/* End Dash */}
        </Route>
        </Route>
        </Route> { /* End Protected Routes*/}

      </Route>
    </Routes>
    </>
  );
}

export default App;