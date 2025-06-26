@echo off
chcp 65001 > nul
echo === Bắt đầu khởi chạy hệ thống vietpt ===

:: Chuyển đến thư mục server
cd /d "D:\Công viêc\Học tập\vietpt\server"
echo -- Cài đặt package cho server --
call npm install
echo -- Khởi động server --
start cmd /k "npm run dev"

:: Chờ vài giây trước khi chạy client
timeout /t 3 /nobreak > nul

:: Chuyển đến thư mục client
cd /d "D:\Công viêc\Học tập\vietpt\client"
echo -- Cài đặt package cho client --
call npm install
echo -- Khởi động client --
start cmd /k "npm run dev"

echo -- Mở giao diện website trên trình duyệt --
start http://localhost:5173

echo === Hệ thống đã được khởi động ===
pause
