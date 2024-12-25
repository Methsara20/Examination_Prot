-- SLIIT_EXAMINATION_PORTAL
-- This is our second semester group assignment project in the SLIIT. This web site design for do the online examinations for the employees.

-- Employee Table Query
CREATE TABLE Employee (
    EmpId CHAR(10) PRIMARY KEY,
    UserName CHAR(30) NOT NULL,
    Password CHAR(15) NOT NULL,
    DateOfBirth Date,
    Gender CHAR(15) CHECK (Gender IN ('MALE', 'FEMALE', 'TRANSGENDER', 'NOT_GIVEN')),
    Designation CHAR(30) NOT NULL,
    Type CHAR(15) CHECK (Type IN('PERMANENT', 'CONTRACT', 'INTERN'))
);

-- Exam Table Query
CREATE TABLE Exam (
    ExamId CHAR(10) PRIMARY KEY,
    QuizData TEXT,
    Title VARCHAR(30),
    Description VARCHAR(250),
    StartDateTime TIMESTAMP NULL DEFAULT NULL,
    EndDateTime TIMESTAMP NULL DEFAULT NULL,
    EmpList VARCHAR(255)
);

-- ExamResult Table Query
CREATE TABLE ExamResult (
    ResultId INT AUTO_INCREMENT PRIMARY KEY,
    ExamId CHAR(10),
    EmpId CHAR(10),
    Score INT DEFAULT NULL,
    Grade CHAR(5) DEFAULT NULL,
    IsPublished BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ExamId) REFERENCES Exam(ExamId),
    FOREIGN KEY (EmpId) REFERENCES Employee(EmpId)
);

-- Complain Table Query
CREATE TABLE Complain (
    ComplainId INT AUTO_INCREMENT PRIMARY KEY,
    EmpId CHAR(10),
    Title VARCHAR(255),
    Description TEXT,
    Status CHAR(10) DEFAULT 'Not Assign',
    AssignerId CHAR(10) DEFAULT NULL,
    FOREIGN KEY (EmpId) REFERENCES Employee(EmpId)
);

