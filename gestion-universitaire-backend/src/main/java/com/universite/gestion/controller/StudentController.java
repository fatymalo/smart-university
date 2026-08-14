package com.universite.gestion.controller;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universite.gestion.entity.Student;
import com.universite.gestion.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


   @GetMapping
public ResponseEntity<?> getAllStudents() {

    List<Map<String, Object>> students = List.of(
        Map.of(
            "id", 1,
            "nom", "Samb",
            "prenom", "Faty",
            "email", "faty@test.com"
        ),
        Map.of(
            "id", 2,
            "nom", "Diop",
            "prenom", "Cheikh",
            "email", "cheikh@test.com"
        )
    );

    return ResponseEntity.ok(students);
}


    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }


    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }


    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
