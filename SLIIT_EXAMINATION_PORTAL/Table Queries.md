-- Employee Table Insert Query
INSERT INTO Employee (EmpId, UserName, Password, DateOfBirth, Gender, Designation, Type)
VALUES ('IT100', 'Kasun', '123', '1990-05-15', 'MALE', 'Department Head', 'PERMANENT');
INSERT INTO Employee (EmpId, UserName, Password, DateOfBirth, Gender, Designation, Type)
VALUES ('IT101', 'Methsara', '123', '1990-05-15', 'MALE', 'HR Manager', 'PERMANENT');
INSERT INTO Employee (EmpId, UserName, Password, DateOfBirth, Gender, Designation, Type)
VALUES ('IT102', 'Udara', '123', '1990-05-15', 'MALE', 'Senior Software Engineer', 'PERMANENT');
INSERT INTO Employee (EmpId, UserName, Password, DateOfBirth, Gender, Designation, Type)
VALUES ('IT103', 'Pragash', '123', '1990-05-15', 'MALE', 'Complain Officer', 'PERMANENT');
INSERT INTO Employee (EmpId, UserName, Password, DateOfBirth, Gender, Designation, Type)
VALUES ('IT104', 'Dasitha', '123', '1990-05-15', 'MALE', 'IT Support Officer', 'PERMANENT');

-- Exam Table Insert Query
INSERT INTO Exam (ExamID, QuizData, Title, Description, StartDateTime, EndDateTime, EmpList)
VALUES ('EX100', '[{"quiz":"What is the highest mountain in the world?","answers":[{"id":1,"text":"Nakals"},{"id":2,"text":"Makalu"},{"id":3,"text":"Everest"},{"id":4,"text":"K2"}],"correctId":3},{"quiz":"Who is the king of the jungle?","answers":[{"id":1,"text":"Rabbit"},{"id":2,"text":"Lion"},{"id":3,"text":"Deer"},{"id":4,"text":"Elephant"}],"correctId":2},{"quiz":"Which fish among the following is known as the monster fish?","answers":[{"id":1,"text":"Gold Fish"},{"id":2,"text":"Piranha Fish"},{"id":3,"text":"Betta Fish"},{"id":4,"text":"Carp Fish"}],"correctId":2}]', 'General Knowledge 1', 'Every chapter within this extensive compendium is a stepping stone illuminating various spheres of history science geography the arts and more.', '2023-10-29 06:00:00', '2023-10-30 06:00:00', '');

INSERT INTO Exam (ExamID, QuizData, Title, Description, StartDateTime, EndDateTime, EmpList)
VALUES ('EX101', '[{"quiz":"Which one is the most speed?","answers":[{"id":1,"text":"Hennessey Venom"},{"id":2,"text":"SSC Tuatara"},{"id":3,"text":"Bugatti Veyron"},{"id":4,"text":"Rimac Nevera"}],"correctId":2},{"quiz":"who is the current president of sri lanka?","answers":[{"id":1,"text":"Gotabaya Rajapaksha"},{"id":2,"text":"S B Disanayaaka"},{"id":3,"text":"Sajith Premadasa"},{"id":4,"text":"Ranil Wikramasinghe"}],"correctId":4},{"quiz":"Which one is a 3D designing application from followings?","answers":[{"id":1,"text":"Adobe Photoshop"},{"id":2,"text":"Unity"},{"id":3,"text":"Autodesk Maya"},{"id":4,"text":"Microsoft PowerPoint"}],"correctId":3}]', 'General Knowledge 2', 'Embark on an intellectual journey with General Knowledge Essentials A Comprehensive Overview your ultimate guide to the world of fascinating information critical for personal development and academic excellence.', '2023-10-29 06:00:00', '2023-10-30 06:00:00', '');

-- Complain Table Insert Query
INSERT INTO Complain (EmpId, Title, Description, Status)
VALUES ('IT102', 'Quiz Submission Error', 'I cannot submit my online quizes at the end. It will generate and error when i try tp do that.', 'Not Assign');

INSERT INTO Complain (EmpId, Title, Description, Status)
VALUES ('IT100', 'Quiz Creation Error', 'System will not allow me to create quizes more than 20. It will crash when i try to exceed this limit. This need an immediate action.', 'Not Assign');

