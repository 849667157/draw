import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Draw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canClick: true, //抽奖点击次数
            i: 0, //位置序号
            j: 0,//用来记录快速转的圈数，判断进入慢速
            f: 3, //快速转的圈数  可自定义
            x: 0,//记录慢速圈数，判断停止
            s: 2, //慢速转的圈数  可自定义
            num: Math.floor(Math.random()*9), //最终的停止位置序号，可根据后台给数据来定义  (怪不得我都抽不到奖=  =)
            step: 1, //当前位置
            fastSpeed: 100, //快速转的速度
            slowSpeed: 500, //慢速转的速度
            slowTurn: false ,//控制慢速转
            isDisabled: false
        }
    }

    //点击开始
    drawClick = (e) => {
        this.setState({
            isDisabled:true //控制按钮不可再点击
        })
        let that = this;
        let speed = that.state.fastSpeed;
        var timer = setInterval(function () {
            that.fastTurn(timer)
        }, speed) //快速转的速度 可自定义 
    }

    //快速转
    fastTurn(argument) {
        let that = this;
        let i = that.state.i; //位置序号
        let f = that.state.f; //快速转的圈数  可自定义
        let j = that.state.j;
        let speed = that.state.slowSpeed;
    
        i = i+1;
        that.setState({
            step: i
        })
        //快速转的圈数累加
        if (i > 7) {
            j++;
            if (j > f) {
                clearInterval(argument); //停止快速转
                that.setState({
                    slowTurn: true //启动慢速转
                })
            }else{
                that.setState({
                    j:j
                })
            }      
        }
        i = i % 8;
        that.setState({
            i: i
        })
        if (that.state.slowTurn) {
            // 慢速转设置
            var slowtimer = setInterval(function () {
                that.slowTurn(slowtimer)
            }, speed)
        }
    }
    // 慢速转
    slowTurn(argument) {
        let that = this;
        let i = that.state.i; //位置序号
        let s = that.state.s; //慢速转的圈数  可自定义
        let x = that.state.x;
        let num = that.state.num; //最终的停止位置序号，可根据后台给数据来定义 (怪不得我都抽不到奖= =)
        //慢速转的圈数累加
        i = i+1;
        console.log(i+"++"+num);
        that.setState({
            step: i
        })
        if(i > 7) {
            x++;
            that.setState({
                x:x
            })
        }
       
        if (x === s && i === num) {
            clearInterval(argument); //停止转动
            //alert(document.getElementById(i).innerHTML);
            that.setState({
                i: num,
                j: 0,
                x: 0,
                num: Math.floor(Math.random()*9),
                slowTurn: false,
                isDisabled:false
            })
        }else{
            i = i % 8;
            that.setState({
                i: i
            })
        }

       
        
    }

    render() {
            const step = this.state.step;
            return (
                <div>
                    <div className="demo">
                    <table>
                        <tbody>   
                    <tr>
                        <td id="1" className={step ===1? "active":"hidden"}>盖浇饭</td>
                        <td id="2" className={step ===2? "active":"hidden"}>九州拉面</td>
                        <td id="3" className={step ===3? "active":"hidden"}>花之舞</td>
                    </tr>
                    <tr>
                        <td id="4" className={step ===8? "active":"hidden"}>烩面</td>
                        <td className={!this.state.isDisabled ? "drawStop" : "drawStart"}><button onClick={this.drawClick}  disabled={this.state.isDisabled}>{!this.state.isDisabled ? '点击开始抽奖' : '正在抽奖中'}</button></td>
                        <td id="5"className={step ===4? "active":"hidden"}>重庆小面</td>
                    </tr>
                    <tr>
                        <td id="6" className={step ===7? "active":"hidden"}>食堂</td>
                        <td id="7" className={step ===6? "active":"hidden"}>点菜</td>
                        <td id="8" className={step ===5? "active":"hidden"}>麻辣香锅</td>
                    </tr>
                            </tbody>
                    </table>
                </div>

            </div>
            );
    }
}

ReactDOM.render(
  <Draw />,
  document.getElementById('root')
    );