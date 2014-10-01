<?php

namespace Lukkos\VCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PersonType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('surname')
            ->add('date_of_birth','text',array('attr' => array(
                                                    'class' => 'form-control',
                                                    'datepicker-popup'=>"yyyy-MM-dd",
                                                    'show-button-bar'=>'false',
                                                    'show-weeks'=>'false')))
            ->add('address')
            ->add('company')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Lukkos\VCardBundle\Entity\Person'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'lukkos_vcardbundle_person';
    }
}
