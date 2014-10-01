<?php
namespace Lukkos\VCardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
//use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class templatesController extends Controller{
    /**
     * @Template()
     */
    public function indexAction()
    { 
        if(!($this->container->get('security.context')->isGranted('ROLE_USER') || $this->container->get('security.context')->isGranted('ROLE_ADMIN'))){
            return $this->redirect($this->generateUrl('fos_user_security_login'));
        }
        return array();
    }
    
    
    /**
     * @Template()
     */
    public function listTemplateAction()
    {
        return array();
    }
    
    /**
     * @Template()
     */
    public function personFormModalAction()
    {
        $form   = $this->createForm(new \Lukkos\VCardBundle\Form\PersonType());
        
        return array('form' => $form->createView());
    }
    
    /**
     * @Template()
     */
    public function companiesListTemplateAction()
    {
        return array();
    }
    
    /**
     * @Template()
     */
    public function companyFormModalAction()
    {
        $form   = $this->createForm(new \Lukkos\VCardBundle\Form\CompanyType());
        
        return array('form' => $form->createView());
    }
    
    /**
     * @Template()
     */
    public function usersListTemplateAction()
    {
        return array();
    }
    
    /**
     * @Template()
     */
    public function userFormModalAction()
    {
        $form   = $this->createForm(new \Lukkos\UserBundle\Form\UserType());
        
        return array('form' => $form->createView());
    }
    
}
