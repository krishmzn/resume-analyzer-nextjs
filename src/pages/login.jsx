import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from './api/authapi';
import Link from 'next/link';

import Cookies from 'js-cookie';

import Modal from "./components/layout/modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {

  const router = useRouter();
  useEffect(() => {
    // Check if the user is authenticated
    const token = Cookies.get("token");
    if (token) {
      // Redirect to the login page if not authenticated
      router.push("/");
    }
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowModal(true)

    try {
      const token = await login(username, password);

      document.cookie = `token=${token}; Max-Age=31536000; path=/;`;
      document.cookie = `username=${username}; Max-Age=31536000; path=/;`;

      router.push('/resume'); // Redirect to the home page after successful login
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // for closing modal
  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  }

  return (
    <section className="flex flex-col justify-center items-center h-[90vh] mb-0">
      <div className="card min-w-[327px] w-full bg-slate-50 justify-center items-center shadow-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90 max-w-fit">

        <form onSubmit={handleSubmit} className="card-body max-w-fit flex justify-center items-center p-9">
          <h1 className="drop-shadow-2xl text-3xl mb-5 tracking-tighter font-bold"><strong>login</strong></h1>
          <div>
            <label htmlFor="username" className="drop-shadow-2xl text-sm input-group input-group-vertical text-black tracking-wider">Username:</label>
            <input type="username" id="username" placeholder='test' value={username} required onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full text-black" />
          </div>

          <div>
            <label htmlFor="password" className="drop-shadow-2xl text-sm input-group input-group-vertical text-black tracking-wider">Password:</label>
            <input type="password" id="password" placeholder='test' value={password} required onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full text-black" />
            <label className="drop-shadow-2xl text-sm input-group input-group-vertical text-brand-s mt-1"> <Link href='/register'><u>Not registered yet?</u></Link></label>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'logging in...' : 'Login'}</button>

        </form>
      </div>

      {error &&
        <Modal show={showModal}>
          <div className="flex flex-col flex-wrap gap-2 justify-center items-center">
            <div className="flex flex-row flex-wrap justify-center items-center gap-1">
              <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} />
              <h1 className="drop-shadow-2xl text-lg">{error}</h1>
            </div>
            <a onClick={handleClose}>
              <button className="btn btn-primary">try again</button>
            </a>
          </div>
        </Modal>
      }

      <p className="drop-shadow-2xl text-center text-base md:text-xl lg:text-3xl mt-7 md:mt-20 lg:mt-32 bg-info px-7 text-neutral-50 tracking-wide">Use the username and password in placeholder</p>

    </section>
  );
}
