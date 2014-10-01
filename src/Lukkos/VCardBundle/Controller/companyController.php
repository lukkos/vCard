<?php

namespace Lukkos\VCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * @RouteResource("company")
 */

class companyController extends Controller implements ClassResourceInterface
{
    /**
    * @Rest\View()
    */
    public function cgetAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $query = $em->getRepository('LukkosVCardBundle:Company')->createQueryBuilder('p')->getQuery();
        $paginator  = $this->get('knp_paginator');
        $companies = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1)/*page number*/,
            $this->get('request')->query->get('pageSize', 5)/*limit per page*/
        );
        $output = array();
        foreach($companies->getItems() as $k => $item)
        {
            $output[$k] = array('item'=>$item);
            $output[$k]['params'] = $companies->getPaginationData();
        }

        return $output;   //$paginator;
    } 

    public function newAction()
    {} // "new_users"     [GET] /users/new

    /**
    * @Rest\View()
    */
    public function postAction(Request $request)
    {
//        $user = $this->container->get('security.context')->getToken()->getUser();
//        if (!is_object($user) || !$user instanceof UserInterface) {
//            throw new AccessDeniedException('This user does not have access to this section.');
//        }
        $form   = $this->createForm(new \Lukkos\VCardBundle\Form\CompanyType());
        
        $jsonData = json_decode($request->getContent(), true); // "true" to get an associative array
        $form->bind($jsonData);
        
        if ($form->isValid()) {
                    $response = new JsonResponse();
                    $errors=array();
                    
                    $em = $this->getDoctrine()->getManager();
                    $company = $form->getData();
                    $em->persist($company);
                    $em->flush();
                    
                    $response->setContent(json_encode(array(
                        'errors'=>$errors,
                        'flash'=>array(
                            'message'=>'Zmiany zostały poprawnie zapisane.',
                            'icon'=>'ok',
                            'status'=>'success'
                         ))));
        }else {
                    $errors = $this->container->get('form_errors')->getArray($form);

                    $response = new JsonResponse();
                    $response->setContent(json_encode(array(
                        'errors'=>$errors,
                        'flash'=>array(
                            'message'=>'Wystąpił błąd! Zmiany nie zostały zapisane.',
                            'icon'=>'remove',
                            'status'=>'danger'
                         ))));
                    
        }
        
        return $response;
    } // "new_users"     [GET] /users/ne
    
    /**
    * @Rest\View()
    */
    public function getAction($id)
    {
        if(!$id)
            throw $this->createNotFoundException('The page does not exist');
        
        $em = $this->getDoctrine()->getEntityManager();
        
        $company = $em->getRepository('LukkosVCardBundle:Company')->findOneById($id)->toArray();

        if(!$company)
            throw $this->createNotFoundException('The Company does not exist');
        return $company;
    } 

    public function putAction(Request $request,$id)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $company = $em->getRepository('LukkosVCardBundle:Company')->find($id);
        
        if(!$company)
            throw $this->createNotFoundException('The Company does not exist');
        
        $form   = $this->createForm(new \Lukkos\VCardBundle\Form\CompanyType(),$company, array('allow_extra_fields' => true));
        
        $jsonData = json_decode($request->getContent(), true); // "true" to get an associative array
        $form->bind($jsonData);
        
        
        if ($form->isValid()) {
                    $response = new JsonResponse();
                    $errors=array();
                    
                    //$company = $form->getData();
                    $em->persist($form->getData());
                    $em->flush();
                    
                    $response->setContent(json_encode(array(
                        'errors'=>$errors,
                        'flash'=>array(
                            'message'=>'Zmiany zostały poprawnie zapisane.',
                            'icon'=>'ok',
                            'status'=>'success'
                         ))));
                    //echo $form->get('name')->getData(); die();
        }else {
                    $errors = $this->container->get('form_errors')->getArray($form);

                    $response = new JsonResponse();
                    $response->setContent(json_encode(array(
                        'errors'=>$errors,
                        'flash'=>array(
                            'message'=>'Wystąpił błąd! Zmiany nie zostały zapisane.',
                            'icon'=>'remove',
                            'status'=>'danger'
                         ))));
                    
        }
        
        return $response;
        
        
    } 
    
    /**
    * @Rest\View()
    */
    public function deleteAction($id)
    {
        if(!$id)
            throw $this->createNotFoundException('The page does not exist');
        
        $em = $this->getDoctrine()->getEntityManager();
        
        $company = $em->getRepository('LukkosVCardBundle:Company')->findOneById($id);
        
        if(!$company)
            throw $this->createNotFoundException('The Company does not exist');
        
        $em->remove($company);
        $em->flush();
        
        $errors = array();
        $response = new JsonResponse();
        $response->setContent(json_encode(array(
                        'errors'=>$errors,
                        'flash'=>array(
                            'message'=>'Company has been removed.',
                            'icon'=>'ok',
                            'status'=>'success'
                         ))));
        return $response;
    } 
  

}
