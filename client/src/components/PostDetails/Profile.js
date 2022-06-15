import { Cover, ProfilePic, ProfileWrapper,Image, ProfileName,Profilee, H3, Follow, Joined } from "./Styles";


const Profile = (post) => {

  
    return (
        <ProfileWrapper>
          <Cover>
               
          </Cover>
          
          <Profilee>
           <ProfilePic>
             <Image>
              <i className="fa-solid fa-user"></i>
             </Image>
          </ProfilePic>
             <ProfileName>
                {post && typeof post.data !== "undefined" && (
                    <H3>
                        {post.data.firstName + " "} 
                        {post.data.lastName}
                    </H3>
                )}
                <Follow>Follow</Follow>
                <Joined>Joined 4 Jun, 22</Joined>
             </ProfileName>
          </Profilee>
        </ProfileWrapper>
    );
}


export default Profile;