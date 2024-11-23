import { Link } from "react-router-dom";
import "./superUserDash.css";

function SuperUserDashboard() {
    return (
      <div>
        <h1>SuperUser Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/admin/approvals">Account Approvals</Link></li>
            <li><Link to="/admin/suspensions">Suspension Appeals</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default SuperUserDashboard;