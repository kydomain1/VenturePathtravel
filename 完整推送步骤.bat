@echo off
chcp 65001 >nul
echo ========================================
echo   VenturePathtravel GitHub 推送工具
echo ========================================
echo.

cd /d D:\VenturePathtravel

echo [步骤1] 检查Git配置...
git config --global --get user.name >nul 2>&1
if errorlevel 1 (
    echo 请先配置Git用户信息：
    echo.
    set /p username="请输入您的GitHub用户名: "
    git config --global user.name "!username!"
    set /p email="请输入您的邮箱: "
    git config --global user.email "!email!"
)

echo [步骤2] 检查仓库状态...
git status

echo.
echo [步骤3] 准备推送...
echo 远程仓库: https://github.com/kydomain1/VenturePathtravel.git
echo.
echo 如果这是第一次推送，您需要输入：
echo - 用户名: kydomain1
echo - 密码: Personal Access Token (不是密码!)
echo.
echo 如何获取Token：
echo 1. 访问 https://github.com/settings/tokens
echo 2. 点击 Generate new token (classic)
echo 3. 勾选 repo 权限
echo 4. 复制生成的token
echo.
pause

echo.
echo [步骤4] 开始推送...
git push -u origin master

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！
    echo.
    echo 可能的原因：
    echo 1. 远程仓库已有内容 - 尝试先拉取
    echo 2. 身份验证失败 - 检查Token是否正确
    echo 3. 网络问题 - 检查网络连接
    echo.
    echo 尝试强制推送？(会覆盖远程仓库内容)
    set /p force="输入 Y 强制推送，其他键取消: "
    if /i "!force!"=="Y" (
        echo 执行强制推送...
        git push -u origin master --force
    )
) else (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 查看您的仓库：
    echo https://github.com/kydomain1/VenturePathtravel
)

echo.
echo ========================================
pause

