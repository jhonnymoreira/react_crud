class Api::V1::Contacts::Create < Trailblazer::Operation
  step ->(options, params) { options["representer.render.class"] = Api::V1::Contacts::Representer::Create }
  step ->(options, params) { options["representer.errors.class"] = ErrorsRepresenter }
  step Model( Contact , :new )
  step Contract::Build(constant: Api::V1::Contacts::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
end
