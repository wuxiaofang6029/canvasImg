<template>
        <canvas ref="canvas"></canvas>
      </template>

<script>
    import Bg from "../assets/1.jpg"
    import {
        imgTobase64,
        uploadBase64
    } from "../api/index"
    export default {
        computed: {
            canvas() {
                return this.$refs.canvas
            },
            context() {
                return this.$refs.canvas.getContext("2d")
            }
        },
        methods: {
            async loadImg(src) {
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = src;
                    img.onload = () => {
                        resolve(img)
                    }
                    img.onerror = () => {
                        reject()
                    }
                })
            }
        },
        async mounted() {
            // 解构赋值
            let {
                canvas,
                context
            } = this
            let img = await this.loadImg(Bg)
                // 设置画布的大小
            canvas.width = img.width
            canvas.height = img.height
                // 绘制背景
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)

            // 绘制头像
            const avatarUrl = "https://avatars1.githubusercontent.com/u/42017475?s=460&v=4"
            const response = await imgTobase64(avatarUrl)
            console.log(response, "...response")
            let avatar = await this.loadImg(response.data.base64)

            // 绘制圆形头像
            context.save()
            context.arc(140, 792, 43, 0, 360)
                // 截取圆形
            context.clip()
            context.drawImage(avatar, 0, 0, avatar.width, avatar.height, 97, 749, 86, 86)

            // 绘制圆形边框
            context.beginPath()
            context.lineWidth = 8
            context.strokeStyle = "#8db287"
            context.arc(140, 792, 43, 0, 360, false)
            context.stroke()
            context.closePath()

            // 绘制姓名
            context.restore()
            context.font = "26px 幼圆"
            context.fillStyle = "#1b540d"
                // 在画布上输出文本之前，检查字体的宽度
            let text = context.measureText("武小芳")
            context.fillText("武小芳", 140 - text.width / 2, 860)

            // 生成图片
            // 生成图片必须转化为base64 否则会报错为画布被污染
            // Uncaught (in promise) DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
            let base64 = canvas.toDataURL("image/jpeg")
            let upload = await uploadBase64(base64)
            console.log(upload, "...upload")
        }
    }
</script>

<style>
    canvas {
        width: 100%;
    }
</style>