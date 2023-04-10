import {Button, Carousel, Checkbox, Form, Input} from "antd";
import React, {useState} from "react";
import logo from "./Auth/img.png"
import useToken from "../Utils/useToken";
function Authenticate(props)
{
    let controller = new AbortController();

    const {setToken} = useToken();
    const [loading, setLoading] = useState(false);
    const styles = {
        main:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f5f5f5',
        },

        container: {
            height: '640px',
            width: '1020px',
            borderRadius: '3.3rem',
            display: 'flex',
            alignItems: 'center',
        }
    }

    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    async function onFinish(values) {
        setLoading(true);
        const id = setTimeout(() => {return controller.abort();}, 10000);
        const response = await fetch('https://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            signal: controller.signal
        });
        clearTimeout(id);
        if (response.ok) {
            setToken(await response.json());
        }
        setLoading(false);
    }

    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    return(
        <div style={styles.main}>
            <div style={styles.container}>

                <div style={{flex:"45%"}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={logo} alt="Logo" style={{width: "50px"}}/>
                        <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', color: '#151111'}}>Logo</h1>
                    </div>
                    <h1 style={{textAlign: "center", fontSize: "2.5rem", fontWeight: "bold"}}>Sign in</h1>
                    <Form
                        name="login"
                        initialValues={{remember: true,}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"

                        style={{padding: "2rem 3rem 2rem 3rem" }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input placeholder="Username" autoComplete="on" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" autoComplete="on"/>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"

                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{maxWidth: "55%"}}>
                    <Carousel >
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                    </Carousel>
                </div>

            </div>
        </div>
    );
}

export default Authenticate;
