import { gql, useQuery, useMutation } from '@apollo/client';

import Posts from '../Post';

import {Container, Row, Col} from "../../Styles/ElementsStyles";
import { PostWrapper } from './styles';

const Home = () => {




    return (
      <PostWrapper>
          <Container>
            <Row>
              <Col w='15' sm="none">
              </Col>
              <Col w='70' sm="100">
               <Posts />
              </Col>
              <Col w='15' sm="none">
              </Col>
            </Row>
          </Container>
      </PostWrapper>
    
    );
}



export default Home;