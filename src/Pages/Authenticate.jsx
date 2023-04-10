import {Button, Carousel, Checkbox, Form, Input} from "antd";
import React, {useState} from "react";
import logo from "./Auth/img.png"
import img1 from "./Auth/image1.png";
import img2 from "./Auth/image2.png";
import img3 from "./Auth/image3.png";
function Authenticate(props)
{
    let controller = new AbortController();

    const [loading, setLoading] = useState(false);
    const styles = {
        main:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#ff8c6b',
        },

        container: {
            height: '640px',
            width: '1020px',
            borderRadius: '3.3rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '0rem 2rem 0rem 2rem',
        },

        input: {
            border: 'none',
            borderBottom: '1px solid #bbb',
            outline: 'none',
            borderRadius: '0px',
            padding: '0.3rem 0rem 0.3rem 0rem',
            fontSize: '0.95rem',
        }
    }

    async function onFinish(values)
    {
        try
        {
            setLoading(true);
            const id = setTimeout(() => {
                props.messageApi.open({type: "error", content:"Request timed out"});
                return controller.abort();
                }, 10000);
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
               const data = await response.json();
               props.setToken(data.data);
            }
            setLoading(false);
        }
        catch (e)
        {
            console.log(e);
            props.messageApi.open({type: "error", content:"Network error or server is not down"});
            setLoading(false);
        }
    }

    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    return(
        <div style={styles.main}>
            <div style={styles.container}>

                <div style={{flex:"45%"}}>
                    <div style={{display: 'flex', alignItems: 'center', marginLeft:'40px'}}>
                        <img src={logo} alt="Logo" style={{width: "50px"}}/>
                        <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', color: '#151111'}}>Logo</h1>
                    </div>
                    <h2 style={{textAlign: "center", fontSize: "2.1rem", fontWeight:'600'}}>Welcome Back</h2>
                    <Form
                        name="login"
                        initialValues={{remember: true,}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                        style={{padding: "2rem 3rem 0rem 3rem", fontWeight:'450'}}
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
                            <Input placeholder="Username" autoComplete="on" style={styles.input}/>
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
                            <Input.Password placeholder="Password" autoComplete="on" style={styles.input}/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item style={{textAlign:'center'}} >
                            <Button type="primary" size='large' htmlType="submit" loading={loading} style={{width: '100%', backgroundColor:'#151111', borderRadius: '10px'}}>
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <p style={{fontWeight:'500', fontSize:'0.7rem', marginLeft:'45px', color:'#bbb'}}>Don't have an account? <a style={{textDecoration: "none"}} href="/register">Sign Up</a></p>
                </div>
                <div style={{width: "55%", backgroundColor: '#FFE0D2', borderRadius: '20px', padding: '50px 0 50px 0'}}>
                    <Carousel autoplay={true} >
                        <div>
                            <img src={img1} alt="img1" style={{width: "100%"}}/>
                        </div>
                        <div>
                            <img src={img2} alt="img2" style={{width: "100%"}}/>
                        </div>
                        <div>
                            <img src={img3} alt="img3" style={{width: "100%"}}/>
                        </div>
                    </Carousel>
                </div>

            </div>
        </div>
    );
}

export default Authenticate;
