import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import '../../Styles/Dashboard.css';
import axios from 'axios';
import { logout } from '../../Features/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const admin = useSelector((state) => state.admin.admin);

  

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/getusers?page=${currentPage}&limit=5`);
        console.log(response)
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-link">
            <FaUsers className="nav-icon" /> All Users
          </Link>
        </nav>
        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" /> Logout
        </div>
      </aside>
      <main className="main-content">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search users" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="user-table">
          <div className="table-header">
            <div className="header-cell">NAME</div>
            <div className="header-cell">EMAIL</div>
            <div className="header-cell">ACTION</div>
          </div>
          <div className="table-body">
            {filteredUsers.map(user => (
              <div className="table-row" key={user.id}>
                <div className="table-cell">{user.name}</div>
                <div className="table-cell">{user.email}</div>
                <div className="table-cell">
                <Link to={`/admin/user-images/${user._id}`} className="action-button">
                    View Images
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
