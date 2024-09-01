import "./Rank.css";
function Rank({ user }) {
  return (
    <div className="pa3">
      <div className="white  f3">
        Welcome {user.name}, your current ditection is ...
      </div>
      <div className="white f1">#{user.detectionCounter}</div>
    </div>
  );
}

export default Rank;
