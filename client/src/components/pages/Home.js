import { gql, useQuery, useMutation } from '@apollo/client';

import Posts from '../Post';

import {Container, Row, Col} from "../../Styles/ElementsStyles";

const Home = () => {




    return (
        <div className="mt-6">
          {/* <Hero /> */}
          
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
        </div>
    );
}



export default Home;