CREATE TABLE [dbo].[EaveConditionEnum_Table] (
    [ID_EaveConditionEnum] INT            IDENTITY (1, 1) NOT NULL,
    [EaveConditionEnum]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_EaveConditionEnum_Table] PRIMARY KEY CLUSTERED ([ID_EaveConditionEnum] ASC)
);

