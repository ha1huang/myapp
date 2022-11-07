import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
// @ts-ignore
import {FormattedMessage, history, SelectLang, useIntl, useModel} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {} = useModel('@@initialState');

  const intl = useIntl();


  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword} = values;
    if (userPassword!==checkPassword){
      message.error("密码不一致");
      return;
    }
    try {
      // 注册
      const id = await register({ ...values, type });
      if (id) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '注册成功！',
        });
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:'user/login',
          query
        });
        return;
      }else {
        throw new Error(`register error id = ${id}`)
      }
      // console.log(user);
      // // 如果失败去设置用户错误信息
      // setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '注册失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {submitText: "注册"}
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="黄的第一次"
          subTitle={intl.formatMessage({ id:"不知道起什么标题？"})}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户注册',
              })}
            />
          </Tabs>


          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userAccount.placeholder',
                  defaultMessage: '账号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="请输入账号!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userPassword.placeholder',
                  defaultMessage: '密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    min:8,
                    type:"string",
                    message:"长度不能小于8"
                  }
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userPassword.placeholder',
                  defaultMessage: '确认密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="密码是必填项"
                      />
                    ),
                  },
                  {
                    min:8,
                    type:"string",
                    message:"长度不能小于8"
                  }
                ]}
              />

              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userAccount.placeholder',
                  defaultMessage: '星球编号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="星球编号是必填项！"
                      />
                    ),
                  },
                ]}
              />

            </>
          )}


        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
