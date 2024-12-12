import "./MainContent.css";  
import ItemCollection from "./Listing/itemCollection";  
import ImageCarousel from "../ImageCarousel/imageCarousel"

const MainContent = () => {
    return (
      <div className="main-content">
        <div className="main-page-container">
          <ImageCarousel />
          <div className="main-page-row">
            <ItemCollection title="My Listings" isMyListings={true} />
          </div>
          <div className="main-page-row">    
            <ItemCollection title="Featured Items" isMyListings={false} />  
          </div>
        </div>
      </div>
    );
  };

export default MainContent;