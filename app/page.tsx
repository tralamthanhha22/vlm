// app/page.tsx
"use client";
import { Progress } from "@/components/ui/progress";
import './buttons.css';
import { motion } from 'framer-motion';

import React, { useState,useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DownloadIcon, FileJson, FileSpreadsheet } from "lucide-react";
import { tr } from "framer-motion/client";

export default function Home() {
  const [activeTab, setActiveTab] = useState("duan");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [filePreviewType, setFilePreviewType] = useState<"image" | "pdf" | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setSelectedFile(file);
  
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(file));
      setFilePreviewType("image");
    } else if (fileType === "application/pdf") {
      setFilePreview(null); // or set PDF preview later
      setFilePreviewType("pdf");
    }
  
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 150);
  };
  
  return (
    <div
      className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-950 text-white p-4 shadow">
        <div className="flex items-center space-x-2">
          <img src="/VeronLogo.jpg" alt="Logo" className="h-10 object-contain" />
          <div className="text-xl font-semibold text-white">| VLM System</div>
        </div>       
        <nav className="space-x-4 flex items-center">
        <motion.button className="button-head" style={{ backgroundColor: "#1B2451" }} whileHover={{
          scale: 1.5,
          backgroundColor: "#1B2451"            
        }}>Upload</motion.button>
        <motion.button className="button-head" style={{ backgroundColor: "#1B2451" }} whileHover={{
          scale: 1.5,
          backgroundColor: "#1B2451"            
        }}>History</motion.button>
        <motion.button className="button-head" style={{ backgroundColor: "#1B2451" }} whileHover={{
          scale: 1.5,
          backgroundColor: "#1B2451"            
        }}>User</motion.button>

        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-50 p-4 border-r">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Upload mới
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Lịch sử document
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Cấu hình AI
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Tài khoản
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto space-y-4 text-white" style={{ backgroundColor: "#174B94" }}>
          {/* Instruction Area */}
          <Card>
            <CardContent className="p-4">
              <p>
                Hãy extract thông tin trong ảnh theo 4 trường: <b>thông tin dự án</b>,
                <b> thông tin đối tác</b>, <b>thông tin nhân viên</b>, <b>thu chi</b>
              </p>
            </CardContent>
          </Card>

          {/* Thêm Button test interaction */}
          <button 
          className="button">
            Test Button
          </button>

          {/* Upload Area Updated */}
          <Card>
            <CardContent className="p-6 border border-dashed border-gray-300 text-center space-y-4">
              <h2 className="text-lg font-semibold">
                Upload file PDF hoặc hình ảnh
              </h2>
              <p>Kéo & thả tệp của bạn vào đây hoặc</p>
              <div>
                <input
                  type="file"
                  accept=".pdf, image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="button bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Chọn tệp
                </button>
              </div>
              <p className="text-sm text-gray-500">(.pdf, .jpg, .png)</p>

              {selectedFile && (
                <div className="mt-4 text-left space-y-2">
                  <span className="inline-flex items-center space-x-2">
                    <DownloadIcon className="h-4 w-4" />
                    <span>{selectedFile.name}</span>
                  </span>

                  {filePreview && filePreviewType === "image" && (
                    <img
                      src={filePreview}
                      alt="preview"
                      className="max-w-sm mt-2 border rounded"
                    />
                  )}

                  {uploadProgress < 100 && (
                    <div>
                      <p className="text-sm text-gray-500">Đang tải lên...</p>
                      <Progress value={uploadProgress} />
                      <div>{uploadProgress}%</div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Status */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-2">Processing status</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Mini Tabs for Info */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="duan">Dự án</TabsTrigger>
              <TabsTrigger value="doitac">Đối tác</TabsTrigger>
              <TabsTrigger value="nhanvien">Nhân viên</TabsTrigger>
              <TabsTrigger value="thuchi">Thu chi</TabsTrigger>
            </TabsList>
            {[
              {
                key: "duan",
                fields: [
                  { label: "project_name", value: "ABC Company Portal" },
                  { label: "project_id", value: "123456" },
                ],
              },
              {
                key: "doitac",
                fields: [
                  { label: "partner_name", value: "XYZ Corp" },
                  { label: "partner_id", value: "P98765" },
                ],
              },
              {
                key: "nhanvien",
                fields: [
                  { label: "employee_name", value: "Nguyen Van A" },
                  { label: "employee_id", value: "E12345" },
                ],
              },
              {
                key: "thuchi",
                fields: [
                  { label: "Income", value: "100,000,000 VND" },
                  { label: "Expense", value: "45,000,000 VND" },
                ],
              },
            ].map((section) => (
              <TabsContent key={section.key} value={section.key}>
                <div className="space-y-2">
                  {section.fields.map((field) => (
                    <div key={field.label}>
                      {field.label}: {field.value}
                    </div>
                  ))}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="space-y-2">
                        {section.fields.map((field) => (
                          <Input
                            key={field.label}
                            placeholder={field.label}
                            defaultValue={field.value}
                          />
                        ))}
                        <Button>Cập nhật</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Export Buttons with icons */}
          <div className="space-x-4">
            <Button variant="outline" size="icon" title="Download JSON">
              <FileJson className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" title="Download Excel">
              <FileSpreadsheet className="h-5 w-5" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}




// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// // }