import React, { Suspense } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import {Tab, Tabs, Nav, Col, Row} from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import AccountProfileEdit from "./AccountProfileEdit"


export default function AccountProfile() {

  const { user } = useSelector(
    ({auth}) => ({
        user: auth.user
    }),
    shallowEqual
  );
  console.log("Account Profile")
  console.log(user)
  return (
    <Tab.Container id="id-account-profile" defaultActiveKey="first">
      <Row>
        <Col md={3}>
          <Card>
            <CardBody>
                <Nav variant="pills" className="flex-column m-2">
                  <Nav.Item>
                    <Nav.Link eventKey="first">General</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Security</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Notification</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">Downloads</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sixth">Billing</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="seventh">Support</Nav.Link>
                  </Nav.Item>
                </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col sm={9}>
          <Card>
            <CardBody>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                      <h2 className="text-primary">General Information</h2>
                      <p className="border-bottom"></p>
                      <p> 
                        firts tab 
                      </p>
                      <AccountProfileEdit  user={user} />
    
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <p> 
                      second tab 
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <p> 
                      third tab 
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <p> 
                      fourth tab 
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <p> 
                      fifth tab 
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sixth">
                    <p> 
                      sixth tab 
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="seventh">
                    <p> 
                      seventh tab 
                    </p>
                  </Tab.Pane>
                </Tab.Content>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Tab.Container>
  );
}
