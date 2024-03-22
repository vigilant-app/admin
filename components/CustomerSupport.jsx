import React from 'react';
import { Tabs, Button, Collapse, Form, Checkbox } from 'antd';
import Link from 'next/link';
import { back } from '../utility/svg';
import { useRouter } from 'next/router';

export default function CustomerSupport() {
  const { Panel } = Collapse;
  const router = useRouter();

  const onChange = key => {
    console.log(key);
  };

  const onChangeCheck = value => {
    console.log(value);
  };

  const usersPanel = (tag, actions) => (
    <div>
      <Checkbox onChange={() => actions()}>{tag}</Checkbox>
    </div>
  );

  return (
    <section className="role-access-page">
      <div className="container">
        <div className="row justify-content-between details-header">
          <div className="col-auto go-back">
            <Button onClick={() => router.back()}>
              {back}
              <span>Go back</span>
            </Button>
          </div>
          <div className="col-auto">
            <h4 className="_tabs">Customer Support - Vigilant</h4>
          </div>
          <div className="col-auto go-back d-none d-lg-block">
            <Link href={''} style={{ visibility: 'hidden' }}>
              {back}
              <span>Go back</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="configuration mb-5">
          <Form layout="vertical">
            <Collapse
              defaultActiveKey={['1']}
              onChange={onChange}
              expandIconPosition={'end'}
            >
              <Panel header={'Users'} key="1">
                <div className="flex-wrap inner gap-lg-5 gap-4">
                  <div className="role-access-heading">Manage Users</div>
                  <div className="d-flex justify-content-between">
                    <div>{usersPanel('View', onChangeCheck)}</div>
                    <div>{usersPanel('Edit', onChangeCheck)}</div>
                    <div>{usersPanel('Delete', onChangeCheck)}</div>
                    <div>{usersPanel('Add', onChangeCheck)}</div>
                    <div>{usersPanel('Special access', onChangeCheck)}</div>
                  </div>
                </div>
              </Panel>
              <Panel header={'Reports'} key="2" className="multiple">
                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">
                      Transaction report
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>

                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">
                      Manual transaction report
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>

                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">
                      Authorized MAnual transaction report
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>

                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">
                      Authorized transaction report
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel header={'Page Management'} key="3">
                <div className="flex-wrap inner gap-lg-5 gap-4">
                  <div className="role-access-heading">Pages</div>
                  <div className="d-flex justify-content-between">
                    <div>{usersPanel('View', onChangeCheck)}</div>
                    <div>{usersPanel('Edit', onChangeCheck)}</div>
                    <div>{usersPanel('Delete', onChangeCheck)}</div>
                    <div>{usersPanel('Add', onChangeCheck)}</div>
                    <div>{usersPanel('Special access', onChangeCheck)}</div>
                  </div>
                </div>
              </Panel>

              <Panel header={'Admin Members'} key="4">
                <div className="flex-wrap inner gap-lg-5 gap-4">
                  <div className="role-access-heading">
                    {usersPanel('Members', onChangeCheck)}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>{usersPanel('View', onChangeCheck)}</div>
                    <div>{usersPanel('Edit', onChangeCheck)}</div>
                    <div>{usersPanel('Delete', onChangeCheck)}</div>
                    <div>{usersPanel('Add', onChangeCheck)}</div>
                    <div>{usersPanel('Special access', onChangeCheck)}</div>
                  </div>
                </div>
              </Panel>

              <Panel header={'Roles'} key="5">
                <div className="flex-wrap inner gap-lg-5 gap-4">
                  <div className="role-access-heading">
                    {usersPanel('Roles', onChangeCheck)}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>{usersPanel('View', onChangeCheck)}</div>
                    <div>{usersPanel('Edit', onChangeCheck)}</div>
                    <div>{usersPanel('Delete', onChangeCheck)}</div>
                    <div>{usersPanel('Add', onChangeCheck)}</div>
                    <div>{usersPanel('Special access', onChangeCheck)}</div>
                  </div>
                </div>
              </Panel>

              {/* <Panel
                header={usersPanel('Communications', onChangeCheck)}
                key="6"
              >
                <div className="flex-wrap inner gap-lg-5 gap-4">
                  <div className="role-access-heading">
                    {usersPanel('App Configuration', onChangeCheck)}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>{usersPanel('View', onChangeCheck)}</div>
                    <div>{usersPanel('Edit', onChangeCheck)}</div>
                    <div>{usersPanel('Delete', onChangeCheck)}</div>
                    <div>{usersPanel('Add', onChangeCheck)}</div>
                    <div>{usersPanel('Special access', onChangeCheck)}</div>
                  </div>
                </div>
              </Panel> */}
              {/* <Panel
                header={usersPanel('Notifications', onChangeCheck)}
                key="7"
              >
                <div></div>
              </Panel> */}
              <Panel header={'Configurations'} key="8" className="multiple">
                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">App Configuration</div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>

                <div className="singleton">
                  <div className="flex-wrap inner gap-lg-5 gap-4">
                    <div className="role-access-heading">
                      {usersPanel('Admin Configuration', onChangeCheck)}
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>{usersPanel('View', onChangeCheck)}</div>
                      <div>{usersPanel('Edit', onChangeCheck)}</div>
                      <div>{usersPanel('Delete', onChangeCheck)}</div>
                      <div>{usersPanel('Add', onChangeCheck)}</div>
                      <div>{usersPanel('Special access', onChangeCheck)}</div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>

            <Form.Item className="mt-5 pt-lg-4 d-flex justify-content-center">
              <Button htmlType="submit" className="our-btn">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
