package com.universite.gestion.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.universite.gestion.entity.Student;
import com.universite.gestion.repository.StudentRepository;


@Service
public class StudentService {

    private final StudentRepository studentRepository;


    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    // Liste des étudiants
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    // Ajouter un étudiant
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }


    // Trouver un étudiant par ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Étudiant introuvable : " + id)
                );
    }


    // Supprimer un étudiant
    public void deleteStudent(Long id) {

        studentRepository.deleteById(id);

    }

}
